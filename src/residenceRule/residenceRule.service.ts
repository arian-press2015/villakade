import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceRule,
  FilterResidenceRuleDto,
  CreateResidenceRuleDto,
  UpdateResidenceRuleDto,
} from './dto';

const select = {
  residence_id: true,
  rule_body: true,
};

@Injectable()
export class ResidenceRuleService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceRuleDto: CreateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    try {
      const residence_rule = await this.prisma.residence_rule.create({
        select,
        data: createResidenceRuleDto,
      });
      return residence_rule;
    } catch (e) {
      console.log('Error in ResidenceRuleService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceRuleDto: FilterResidenceRuleDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
    } = {};
    if (filterResidenceRuleDto.residence_id) {
      where.residence_id = parseInt(filterResidenceRuleDto.residence_id);
    }

    const residence_rules = await this.prisma.residence_rule.count({
      where,
    });
    return residence_rules;
  }

  async findAll(
    filterResidenceRuleDto: FilterResidenceRuleDto,
  ): Promise<ResidenceRule[]> {
    const where: {
      residence_id?: number;
    } = {};
    if (filterResidenceRuleDto.residence_id) {
      where.residence_id = parseInt(filterResidenceRuleDto.residence_id);
    }

    const orderBy = {};
    if (filterResidenceRuleDto.sort) {
      filterResidenceRuleDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_rules = await this.prisma.residence_rule.findMany({
      select,
      where,
      skip: filterResidenceRuleDto.offset
        ? parseInt(filterResidenceRuleDto.offset)
        : undefined,
      take: filterResidenceRuleDto.limit
        ? parseInt(filterResidenceRuleDto.limit)
        : undefined,
      orderBy,
    });
    return residence_rules;
  }

  async findOne(id: number): Promise<ResidenceRule> {
    const residence_rule = await this.prisma.residence_rule.findUnique({
      select,
      where: { residence_id: id },
    });

    if (residence_rule === null) {
      throw new BadRequestException('residence_rule not found');
    }

    return residence_rule;
  }

  async update(
    id: number,
    updateResidenceRuleDto: UpdateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    try {
      const residence_rule = await this.prisma.residence_rule.update({
        select,
        data: {
          rule_body: updateResidenceRuleDto.rule_body,
        },
        where: {
          residence_id: id,
        },
      });
      return residence_rule;
    } catch (e) {
      console.log('Error in ResidenceRuleService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_rule not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_rule.delete({ where: { residence_id: id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_rule not found');
      }
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceCooking,
  FilterResidenceCookingDto,
  CreateResidenceCookingDto,
  UpdateResidenceCookingDto,
} from './dto';

const select = {
  residence_id: true,
  fridge: true,
  microwave: true,
  pan: true,
  pot: true,
  grill: true,
  skewer: true,
  oven: true,
  lighter: true,
};

@Injectable()
export class ResidenceCookingService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceCookingDto: CreateResidenceCookingDto,
  ): Promise<ResidenceCooking> {
    try {
      const residence_cooking_attribute =
        await this.prisma.residence_cooking_attribute.create({
          select,
          data: createResidenceCookingDto,
        });
      return residence_cooking_attribute;
    } catch (e) {
      console.log('Error in ResidenceCookingService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceCookingDto: FilterResidenceCookingDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      fridge?: boolean;
      microwave?: boolean;
      pan?: boolean;
      pot?: boolean;
      grill?: boolean;
      skewer?: boolean;
      oven?: boolean;
      lighter?: boolean;
    } = {};
    if (filterResidenceCookingDto.residence_id) {
      where.residence_id = parseInt(filterResidenceCookingDto.residence_id);
    } else if (filterResidenceCookingDto.fridge) {
      where.fridge = filterResidenceCookingDto.fridge === 'true';
    } else if (filterResidenceCookingDto.microwave) {
      where.microwave = filterResidenceCookingDto.microwave === 'true';
    } else if (filterResidenceCookingDto.pan) {
      where.pan = filterResidenceCookingDto.pan === 'true';
    } else if (filterResidenceCookingDto.pot) {
      where.pot = filterResidenceCookingDto.pot === 'true';
    } else if (filterResidenceCookingDto.grill) {
      where.grill = filterResidenceCookingDto.grill === 'true';
    } else if (filterResidenceCookingDto.skewer) {
      where.skewer = filterResidenceCookingDto.skewer === 'true';
    } else if (filterResidenceCookingDto.oven) {
      where.oven = filterResidenceCookingDto.oven === 'true';
    } else if (filterResidenceCookingDto.lighter) {
      where.lighter = filterResidenceCookingDto.lighter === 'true';
    }

    const residence_cooking_attributes =
      await this.prisma.residence_cooking_attribute.count({
        where,
      });
    return residence_cooking_attributes;
  }

  async findAll(
    filterResidenceCookingDto: FilterResidenceCookingDto,
  ): Promise<ResidenceCooking[]> {
    const where: {
      residence_id?: number;
      fridge?: boolean;
      microwave?: boolean;
      pan?: boolean;
      pot?: boolean;
      grill?: boolean;
      skewer?: boolean;
      oven?: boolean;
      lighter?: boolean;
    } = {};
    if (filterResidenceCookingDto.residence_id) {
      where.residence_id = parseInt(filterResidenceCookingDto.residence_id);
    } else if (filterResidenceCookingDto.fridge) {
      where.fridge = filterResidenceCookingDto.fridge === 'true';
    } else if (filterResidenceCookingDto.microwave) {
      where.microwave = filterResidenceCookingDto.microwave === 'true';
    } else if (filterResidenceCookingDto.pan) {
      where.pan = filterResidenceCookingDto.pan === 'true';
    } else if (filterResidenceCookingDto.pot) {
      where.pot = filterResidenceCookingDto.pot === 'true';
    } else if (filterResidenceCookingDto.grill) {
      where.grill = filterResidenceCookingDto.grill === 'true';
    } else if (filterResidenceCookingDto.skewer) {
      where.skewer = filterResidenceCookingDto.skewer === 'true';
    } else if (filterResidenceCookingDto.oven) {
      where.oven = filterResidenceCookingDto.oven === 'true';
    } else if (filterResidenceCookingDto.lighter) {
      where.lighter = filterResidenceCookingDto.lighter === 'true';
    }

    const orderBy = {};
    if (filterResidenceCookingDto.sort) {
      filterResidenceCookingDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_cooking_attributes =
      await this.prisma.residence_cooking_attribute.findMany({
        select,
        where,
        skip: filterResidenceCookingDto.offset
          ? parseInt(filterResidenceCookingDto.offset)
          : undefined,
        take: filterResidenceCookingDto.limit
          ? parseInt(filterResidenceCookingDto.limit)
          : undefined,
        orderBy,
      });
    return residence_cooking_attributes;
  }

  async findOne(id: number): Promise<ResidenceCooking> {
    const residence_cooking_attribute =
      await this.prisma.residence_cooking_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_cooking_attribute === null) {
      throw new BadRequestException('residence_cooking_attribute not found');
    }

    return residence_cooking_attribute;
  }

  async update(
    id: number,
    updateResidenceCookingDto: UpdateResidenceCookingDto,
  ): Promise<ResidenceCooking> {
    try {
      const residence_cooking_attribute =
        await this.prisma.residence_cooking_attribute.update({
          select,
          data: {
            fridge: updateResidenceCookingDto.fridge,
            microwave: updateResidenceCookingDto.microwave,
            pan: updateResidenceCookingDto.pan,
            pot: updateResidenceCookingDto.pot,
            grill: updateResidenceCookingDto.grill,
            skewer: updateResidenceCookingDto.skewer,
            oven: updateResidenceCookingDto.oven,
            lighter: updateResidenceCookingDto.lighter,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_cooking_attribute;
    } catch (e) {
      console.log('Error in ResidenceCookingService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_cooking_attribute not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_cooking_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_cooking_attribute not found');
      }
    }
  }
}

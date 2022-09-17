import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  Support,
  FilterSupportDto,
  CreateSupportDto,
  UpdateSupportDto,
} from './dto';

const select = {
  id: true,
  full_name: true,
  phone: true,
  active: true,
};

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}
  async create(createSupportDto: CreateSupportDto): Promise<Support> {
    try {
      const support = await this.prisma.support.create({
        select,
        data: createSupportDto,
      });
      return support;
    } catch (e) {
      console.log('Error in SupportService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(filterSupportDto: FilterSupportDto): Promise<number> {
    const where: {
      full_name?: { contains: string };
      phone?: { contains: string };
      active?: boolean;
    } = {};
    if (filterSupportDto.full_name) {
      where.full_name = {
        contains: filterSupportDto.full_name,
      };
    } else if (filterSupportDto.phone) {
      where.phone = {
        contains: filterSupportDto.phone,
      };
    } else if (filterSupportDto.active) {
      where.active = filterSupportDto.active === 'true' ? true : false;
    }

    const supports = await this.prisma.support.count({
      where,
    });
    return supports;
  }

  async findAll(filterSupportDto: FilterSupportDto): Promise<Support[]> {
    const where: {
      full_name?: { contains: string };
      phone?: { contains: string };
      active?: boolean;
    } = {};
    if (filterSupportDto.full_name) {
      where.full_name = {
        contains: filterSupportDto.full_name,
      };
    } else if (filterSupportDto.phone) {
      where.phone = {
        contains: filterSupportDto.phone,
      };
    } else if (filterSupportDto.active) {
      where.active = filterSupportDto.active === 'true' ? true : false;
    }

    const orderBy = {};
    if (filterSupportDto.sort) {
      filterSupportDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const supports = await this.prisma.support.findMany({
      select,
      where,
      skip: filterSupportDto.offset
        ? parseInt(filterSupportDto.offset)
        : undefined,
      take: filterSupportDto.limit
        ? parseInt(filterSupportDto.limit)
        : undefined,
      orderBy,
    });
    return supports;
  }

  async findOne(id: number): Promise<Support> {
    const support = await this.prisma.support.findUnique({
      select,
      where: { id },
    });

    if (support === null) {
      throw new BadRequestException('support not found');
    }

    return support;
  }

  async update(
    id: number,
    updateSupportDto: UpdateSupportDto,
  ): Promise<Support> {
    try {
      const support = await this.prisma.support.update({
        select,
        data: {
          full_name: updateSupportDto.full_name,
          phone: updateSupportDto.phone,
          active: updateSupportDto.active,
        },
        where: {
          id,
        },
      });
      return support;
    } catch (e) {
      console.log('Error in SupportService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('support not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.support.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('support not found');
      }
    }
  }
}

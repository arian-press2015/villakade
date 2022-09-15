import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { Type, FilterTypeDto, CreateTypeDto, UpdateTypeDto } from './dto';

const select = {
  id: true,
  title: true,
  fa_title: true,
};

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    try {
      const type: Type = await this.prisma.type.create({
        select,
        data: createTypeDto,
      });

      return type;
    } catch (e) {
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'type_title_UN') {
          throw new BadRequestException('title is taken before');
        }
      }
      throw e;
    }
  }

  async getCount(filterTypeDto: FilterTypeDto): Promise<number> {
    const where: {
      fa_title?: { contains: string };
      title?: { contains: string };
    } = {};
    if (filterTypeDto.fa_title) {
      where.fa_title = {
        contains: filterTypeDto.fa_title,
      };
    } else if (filterTypeDto.title) {
      where.title = {
        contains: filterTypeDto.title,
      };
    }

    const orderBy = {};
    if (filterTypeDto.sort) {
      filterTypeDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const count = await this.prisma.type.count({
      where,
    });
    return count;
  }

  async findAll(filterTypeDto: FilterTypeDto): Promise<Type[]> {
    const where: {
      fa_title?: { contains: string };
      title?: { contains: string };
    } = {};
    if (filterTypeDto.fa_title) {
      where.fa_title = {
        contains: filterTypeDto.fa_title,
      };
    } else if (filterTypeDto.title) {
      where.title = {
        contains: filterTypeDto.title,
      };
    }

    const orderBy = {};
    if (filterTypeDto.sort) {
      filterTypeDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const cities = await this.prisma.type.findMany({
      select,
      where,
      skip: filterTypeDto.offset ? parseInt(filterTypeDto.offset) : undefined,
      take: filterTypeDto.limit ? parseInt(filterTypeDto.limit) : undefined,
      orderBy,
    });
    return cities;
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.prisma.type.findUnique({
      select,
      where: { id },
    });

    if (type === null) {
      throw new BadRequestException('type not found');
    }

    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    try {
      const type = await this.prisma.type.update({
        select,
        data: {
          title: updateTypeDto.title,
          fa_title: updateTypeDto.fa_title,
        },
        where: {
          id,
        },
      });
      return type;
    } catch (e) {
      console.log('Error in TypeService.update()', e.code, e.meta);
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'type_title_UN') {
          throw new BadRequestException('title is taken before');
        } else if (e.meta.target === 'type_fa_title_UN') {
          throw new BadRequestException('fa_title is taken before');
        }
      } else if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('type not found');
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.type.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('type not found');
      }
    }
  }
}

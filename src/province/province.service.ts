import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  Province,
  FilterProvinceDto,
  CreateProvinceDto,
  UpdateProvinceDto,
} from './dto';

const select = {
  id: true,
  name: true,
  fa_name: true,
  city: {
    select: {
      id: true,
      name: true,
      fa_name: true,
      total_residence_count: true,
    },
  },
};

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}
  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    try {
      const province = await this.prisma.province.create({
        select,
        data: createProvinceDto,
      });
      return province;
    } catch (e) {
      console.log('Error in ProvinceService.create()', e.code, e.meta);
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'province_name_UN') {
          throw new BadRequestException('name is taken before');
        } else if (e.meta.target === 'province_fa_name_UN') {
          throw new BadRequestException('fa_name is taken before');
        }
      }
    }
  }

  async getCount(filterProvinceDto: FilterProvinceDto): Promise<number> {
    const where: {
      fa_name?: { contains: string };
      name?: { contains: string };
    } = {};
    if (filterProvinceDto.fa_name) {
      where.fa_name = {
        contains: filterProvinceDto.fa_name,
      };
    } else if (filterProvinceDto.name) {
      where.name = {
        contains: filterProvinceDto.name,
      };
    }

    const count = await this.prisma.province.count({
      where,
      skip: filterProvinceDto.offset
        ? parseInt(filterProvinceDto.offset)
        : undefined,
      take: filterProvinceDto.limit
        ? parseInt(filterProvinceDto.limit)
        : undefined,
    });
    return count;
  }

  async findAll(filterProvinceDto: FilterProvinceDto): Promise<Province[]> {
    const where: {
      fa_name?: { contains: string };
      name?: { contains: string };
    } = {};
    if (filterProvinceDto.fa_name) {
      where.fa_name = {
        contains: filterProvinceDto.fa_name,
      };
    } else if (filterProvinceDto.name) {
      where.name = {
        contains: filterProvinceDto.name,
      };
    }

    const orderBy = {};
    if (filterProvinceDto.sort) {
      filterProvinceDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const provinces = await this.prisma.province.findMany({
      select,
      where,
      skip: filterProvinceDto.offset
        ? parseInt(filterProvinceDto.offset)
        : undefined,
      take: filterProvinceDto.limit
        ? parseInt(filterProvinceDto.limit)
        : undefined,
      orderBy,
    });
    return provinces;
  }

  async findOne(id: number): Promise<Province> {
    const province = await this.prisma.province.findUnique({
      select,
      where: { id },
    });

    if (province === null) {
      throw new HttpException('province not found', 400);
    }

    return province;
  }

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    const province = {
      id,
      name: updateProvinceDto.name || 'fars',
      fa_name: updateProvinceDto.fa_name || 'فارس',
      city: [
        {
          id: 123,
          name: 'shiraz',
          fa_name: 'شیراز',
          total_residence_count: 12,
        },
      ],
    };
    return province;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

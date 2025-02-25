import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { City, FilterCityDto, CreateCityDto, UpdateCityDto } from './dto';

const select = {
  id: true,
  name: true,
  fa_name: true,
  total_residence_count: true,
  province: {
    select: { id: true, name: true, fa_name: true },
  },
};

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}
  async create(createCityDto: CreateCityDto): Promise<City> {
    try {
      const city = await this.prisma.city.create({
        select,
        data: createCityDto,
      });
      return city;
    } catch (e) {
      console.log('Error in CityService.create()', e.code, e.meta);
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'city_name_UN') {
          throw new BadRequestException('name is taken before');
        } else if (e.meta.target === 'city_fa_name_UN') {
          throw new BadRequestException('fa_name is taken before');
        }
      }
    }
  }

  async getCount(filterCityDto: FilterCityDto): Promise<number> {
    const where: {
      fa_name?: { contains: string };
      name?: { contains: string };
      province_id?: number;
    } = {};
    if (filterCityDto.fa_name) {
      where.fa_name = {
        contains: filterCityDto.fa_name,
      };
    } else if (filterCityDto.name) {
      where.name = {
        contains: filterCityDto.name,
      };
    }

    if (filterCityDto.province_id) {
      where.province_id = parseInt(filterCityDto.province_id);
    }

    const cities = await this.prisma.city.count({
      where,
    });
    return cities;
  }

  async findAll(filterCityDto: FilterCityDto): Promise<City[]> {
    const where: {
      fa_name?: { contains: string };
      name?: { contains: string };
      province_id?: number;
    } = {};
    if (filterCityDto.fa_name) {
      where.fa_name = {
        contains: filterCityDto.fa_name,
      };
    } else if (filterCityDto.name) {
      where.name = {
        contains: filterCityDto.name,
      };
    }

    if (filterCityDto.province_id) {
      where.province_id = parseInt(filterCityDto.province_id);
    }

    const orderBy = {};
    if (filterCityDto.sort) {
      filterCityDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const cities = await this.prisma.city.findMany({
      select,
      where,
      skip: filterCityDto.offset ? parseInt(filterCityDto.offset) : undefined,
      take: filterCityDto.limit ? parseInt(filterCityDto.limit) : undefined,
      orderBy,
    });
    return cities;
  }

  async findOne(id: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      select,
      where: { id },
    });

    if (city === null) {
      throw new BadRequestException('city not found');
    }

    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    try {
      const city = await this.prisma.city.update({
        select,
        data: {
          name: updateCityDto.name,
          fa_name: updateCityDto.fa_name,
          province_id: updateCityDto.province_id,
        },
        where: {
          id,
        },
      });
      return city;
    } catch (e) {
      console.log('Error in CityService.update()', e.code, e.meta);
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'city_name_UN') {
          throw new BadRequestException('name is taken before');
        } else if (e.meta.target === 'city_fa_name_UN') {
          throw new BadRequestException('fa_name is taken before');
        }
      } else if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('city not found');
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.city.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('city not found');
      }
    }
  }
}

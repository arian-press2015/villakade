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
    return 1;
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
    const city = {
      id: 1,
      name: 'shiraz',
      fa_name: 'شیراز',
      total_residence_count: 4,
      province: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
      },
    };
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = {
      id,
      name: updateCityDto.name || 'shiraz',
      fa_name: updateCityDto.fa_name || 'شیراز',
      total_residence_count: 4,
      province: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
      },
    };
    return city;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

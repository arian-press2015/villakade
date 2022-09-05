import { Injectable } from '@nestjs/common';
import { City, FilterCityDto, CreateCityDto, UpdateCityDto } from './dto';

@Injectable()
export class CityService {
  async create(createCityDto: CreateCityDto): Promise<City> {
    const city = {
      id: 1,
      name: createCityDto.name,
      fa_name: createCityDto.fa_name,
      total_residence_count: 0,
      province: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
      },
    };
    return city;
  }

  async getCount(filterCityDto: FilterCityDto): Promise<number> {
    return 1;
  }

  async findAll(filterCityDto: FilterCityDto): Promise<City[]> {
    const city = [
      {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
        province: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
        },
      },
    ];
    return city;
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

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

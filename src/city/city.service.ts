import { Injectable } from '@nestjs/common';
import { City, FilterCityDto, CreateCityDto, UpdateCityDto } from './dto';

@Injectable()
export class CityService {
  async create(createCityDto: CreateCityDto): Promise<City> {
    const city = {
      id: 1,
      province_id: createCityDto.province_id,
      name: createCityDto.name,
      fa_name: createCityDto.fa_name,
      total_residence_count: 0,
    };
    return city;
  }

  async findAll(filterCityDto: FilterCityDto): Promise<City[]> {
    const city = [
      {
        id: 1,
        province_id: 4,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
      },
    ];
    return city;
  }

  async findOne(id: number): Promise<City> {
    const city = {
      id: 1,
      province_id: 4,
      name: 'shiraz',
      fa_name: 'شیراز',
      total_residence_count: 4,
    };
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = {
      id,
      province_id: 4,
      name: updateCityDto.name || 'shiraz',
      fa_name: updateCityDto.fa_name || 'شیراز',
      total_residence_count: 4,
    };
    return city;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

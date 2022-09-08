import { Injectable } from '@nestjs/common';
import {
  Province,
  FilterProvinceDto,
  CreateProvinceDto,
  UpdateProvinceDto,
} from './dto';

@Injectable()
export class ProvinceService {
  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const province = {
      id: 1,
      name: createProvinceDto.name,
      fa_name: createProvinceDto.fa_name,
      cities: [],
    };
    return province;
  }

  async getCount(filterProvinceDto: FilterProvinceDto): Promise<number> {
    return 1;
  }

  async findAll(filterProvinceDto: FilterProvinceDto): Promise<Province[]> {
    const province = [
      {
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
        cities: [
          {
            id: 123,
            name: 'shiraz',
            fa_name: 'شیراز',
            total_residence_count: 12,
          },
        ],
      },
    ];
    return province;
  }

  async findOne(id: number): Promise<Province> {
    const province = {
      id,
      name: 'fars',
      fa_name: 'فارس',
      cities: [
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

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    const province = {
      id,
      name: updateProvinceDto.name || 'fars',
      fa_name: updateProvinceDto.fa_name || 'فارس',
      cities: [
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

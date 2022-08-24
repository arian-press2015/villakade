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
      },
    ];
    return province;
  }

  async findOne(id: number): Promise<Province> {
    const province = {
      id,
      name: 'fars',
      fa_name: 'فارس',
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
    };
    return province;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

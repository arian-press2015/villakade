import { Injectable } from '@nestjs/common';
import {
  Support,
  FilterSupportDto,
  CreateSupportDto,
  UpdateSupportDto,
} from './dto';

@Injectable()
export class SupportService {
  async create(createSupportDto: CreateSupportDto): Promise<Support> {
    const support = {
      id: 1,
      full_name: createSupportDto.full_name,
      phone: createSupportDto.phone,
      active: createSupportDto.active,
    };
    return support;
  }

  async getCount(filterSupportDto: FilterSupportDto): Promise<number> {
    return 1;
  }

  async findAll(filterSupportDto: FilterSupportDto): Promise<Support[]> {
    const support = [
      {
        id: 1,
        full_name: 'AP2015',
        phone: '+989012883045',
        active: true,
      },
    ];
    return support;
  }

  async findOne(id: number): Promise<Support> {
    const support = {
      id,
      full_name: 'AP2015',
      phone: '+989012883045',
      active: true,
    };
    return support;
  }

  async update(
    id: number,
    updateSupportDto: UpdateSupportDto,
  ): Promise<Support> {
    const support = {
      id,
      full_name: updateSupportDto.full_name || 'AP2015',
      phone: updateSupportDto.phone || '+989012883045',
      active: updateSupportDto.active || true,
    };
    return support;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

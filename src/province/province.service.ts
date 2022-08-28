import { BadRequestException, Injectable } from '@nestjs/common';
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
        throw new BadRequestException('province already exists');
      }
    }
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

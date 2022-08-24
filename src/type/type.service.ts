import { Injectable } from '@nestjs/common';
import { Type, FilterTypeDto, CreateTypeDto, UpdateTypeDto } from './dto';

@Injectable()
export class TypeService {
  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const type = {
      id: 1,
      title: createTypeDto.title,
      fa_title: createTypeDto.fa_title,
    };
    return type;
  }

  async getCount(filterTypeDto: FilterTypeDto): Promise<number> {
    return 1;
  }

  async findAll(filterTypeDto: FilterTypeDto): Promise<Type[]> {
    const type = [
      {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
    ];
    return type;
  }

  async findOne(id: number): Promise<Type> {
    const type = {
      id,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };
    return type;
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = {
      id,
      title: updateTypeDto.title || 'apartment',
      fa_title: updateTypeDto.fa_title || 'آپارتمان',
    };
    return type;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

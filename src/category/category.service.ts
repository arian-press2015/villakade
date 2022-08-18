import { Injectable } from '@nestjs/common';
import {
  Category,
  FilterCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = {
      id: 1,
      title: createCategoryDto.title,
      fa_title: createCategoryDto.fa_title,
    };
    return category;
  }

  async findAll(filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    const category = [
      {
        id: 1,
        title: 'beach',
        fa_title: 'ساحلی و رو به دریا',
      },
    ];
    return category;
  }

  async findOne(id: number): Promise<Category> {
    const category = {
      id,
      title: 'beach',
      fa_title: 'ساحلی و رو به دریا',
    };
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = {
      id,
      title: updateCategoryDto.title || 'beach',
      fa_title: updateCategoryDto.fa_title || 'ساحلی و رو به دریا',
    };
    return category;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

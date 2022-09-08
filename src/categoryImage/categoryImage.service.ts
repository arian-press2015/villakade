import { Injectable } from '@nestjs/common';
import {
  CategoryImage,
  FilterCategoryImageDto,
  CreateCategoryImageDto,
  UpdateCategoryImageDto,
} from './dto';

@Injectable()
export class CategoryImageService {
  async create(
    createCategoryImageDto: CreateCategoryImageDto,
  ): Promise<CategoryImage> {
    const categoryImage = {
      category_id: createCategoryImageDto.category_id,
      url: '/path/to/file',
      width: createCategoryImageDto.width,
      height: createCategoryImageDto.height,
    };
    return categoryImage;
  }

  async getCount(
    filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<number> {
    return 1;
  }

  async findAll(
    filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<CategoryImage[]> {
    const categoryImage = [
      {
        category_id: 1,
        url: '/fake/image/url',
        width: 480,
        height: 640,
      },
    ];
    return categoryImage;
  }

  async findOne(id: number): Promise<CategoryImage> {
    const categoryImage = {
      category_id: id,
      url: '/fake/image/url',
      width: 480,
      height: 640,
    };
    return categoryImage;
  }

  async update(
    id: number,
    updateCategoryImageDto: UpdateCategoryImageDto,
  ): Promise<CategoryImage> {
    const categoryImage = {
      category_id: updateCategoryImageDto.category_id,
      url: '/fake/image/url',
      width: 480,
      height: 640,
    };
    return categoryImage;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

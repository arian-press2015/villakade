import { Injectable } from '@nestjs/common';
import {
  ResidenceCategory,
  FilterResidenceCategoryDto,
  CreateResidenceCategoryDto,
} from './dto';
import { DeleteResidenceCategoryDto } from './dto/delete-residenceCategory.dto';

@Injectable()
export class ResidenceCategoryService {
  async create(
    createResidenceCategoryDto: CreateResidenceCategoryDto,
  ): Promise<ResidenceCategory> {
    const residenceResidenceCategory = {
      category_id: createResidenceCategoryDto.category_id,
      id: 1,
      host_id: 123,
      title: 'آپارتمان در شیراز',
      type_id: 123,
      location: 'شیراز دست چپ پلاک ۲',
      price: 200000,
      active: true,
      city_id: 123,
    };
    return residenceResidenceCategory;
  }

  async getCount(
    filterResidenceCategoryDto: FilterResidenceCategoryDto,
  ): Promise<number> {
    return 1;
  }

  async findAll(
    filterResidenceCategoryDto: FilterResidenceCategoryDto,
  ): Promise<ResidenceCategory[]> {
    const residenceResidenceCategory = [
      {
        category_id: 123,
        id: 1,
        host_id: 123,
        title: 'آپارتمان در شیراز',
        type_id: 123,
        location: 'شیراز دست چپ پلاک ۲',
        price: 200000,
        active: true,
        city_id: 123,
      },
    ];
    return residenceResidenceCategory;
  }

  async remove(
    deleteResidenceCategoryDto: DeleteResidenceCategoryDto,
  ): Promise<void> {
    return;
  }
}

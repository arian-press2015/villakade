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
      residence_id: createResidenceCategoryDto.residence_id,
    };
    return residenceResidenceCategory;
  }

  async findAll(
    filterResidenceCategoryDto: FilterResidenceCategoryDto,
  ): Promise<ResidenceCategory[]> {
    const residenceResidenceCategory = [
      {
        category_id: 123,
        residence_id: 12345,
      },
    ];
    return residenceResidenceCategory;
  }

  async remove(
    deleteResidenceCategoryDto: DeleteResidenceCategoryDto,
  ): Promise<boolean> {
    return true;
  }
}

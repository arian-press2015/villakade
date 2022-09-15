import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  Category,
  FilterCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

const select = {
  id: true,
  title: true,
  fa_title: true,
};

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category: Category = await this.prisma.category.create({
        select,
        data: createCategoryDto,
      });

      return category;
    } catch (e) {
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'category_title_UN') {
          throw new BadRequestException('title is taken before');
        }
      }
      throw e;
    }
  }

  async getCount(filterCategoryDto: FilterCategoryDto): Promise<number> {
    return 1;
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

  async remove(id: number): Promise<void> {
    return;
  }
}

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
    const where: {
      fa_title?: { contains: string };
      title?: { contains: string };
      province_id?: number;
    } = {};
    if (filterCategoryDto.fa_title) {
      where.fa_title = {
        contains: filterCategoryDto.fa_title,
      };
    } else if (filterCategoryDto.title) {
      where.title = {
        contains: filterCategoryDto.title,
      };
    }

    const orderBy = {};
    if (filterCategoryDto.sort) {
      filterCategoryDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const cities = await this.prisma.category.findMany({
      select,
      where,
      skip: filterCategoryDto.offset
        ? parseInt(filterCategoryDto.offset)
        : undefined,
      take: filterCategoryDto.limit
        ? parseInt(filterCategoryDto.limit)
        : undefined,
      orderBy,
    });
    return cities;
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

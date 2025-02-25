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
  category_image: {
    select: {
      category_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
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
    const where: {
      fa_title?: { contains: string };
      title?: { contains: string };
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

    const count = await this.prisma.category.count({
      where,
    });
    return count;
  }

  async findAll(filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    const where: {
      fa_title?: { contains: string };
      title?: { contains: string };
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

    const categories = await this.prisma.category.findMany({
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
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      select,
      where: { id },
    });

    if (category === null) {
      throw new BadRequestException('category not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.prisma.category.update({
        select,
        data: {
          title: updateCategoryDto.title,
          fa_title: updateCategoryDto.fa_title,
        },
        where: {
          id,
        },
      });
      return category;
    } catch (e) {
      console.log('Error in CategoryService.update()', e.code, e.meta);
      if (e.code && e.code === 'P2002') {
        if (e.meta.target === 'category_title_UN') {
          throw new BadRequestException('title is taken before');
        } else if (e.meta.target === 'category_fa_title_UN') {
          throw new BadRequestException('fa_title is taken before');
        }
      } else if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('category not found');
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.category.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('category not found');
      }
    }
  }
}

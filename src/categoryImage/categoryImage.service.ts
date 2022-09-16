import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  CategoryImage,
  FilterCategoryImageDto,
  CreateCategoryImageDto,
  UpdateCategoryImageDto,
} from './dto';

const select = {
  category_id: true,
  url: true,
  width: true,
  height: true,
};

@Injectable()
export class CategoryImageService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryImageDto: CreateCategoryImageDto,
    url: string,
  ): Promise<CategoryImage> {
    try {
      const { file, category_id, width, height } = createCategoryImageDto;
      const CategoryImage: CategoryImage =
        await this.prisma.category_image.create({
          select,
          data: {
            category_id: +category_id,
            width: +width,
            height: +height,
            url,
          },
        });

      return CategoryImage;
    } catch (e) {
      console.log('Error in CategoryImageService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<number> {
    const where: {
      category_id?: number;
    } = {};
    if (filterCategoryImageDto.category_id) {
      where.category_id = parseInt(filterCategoryImageDto.category_id);
    }

    const count = await this.prisma.category_image.count({
      where,
    });
    return count;
  }

  async findAll(
    filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<CategoryImage[]> {
    const where: {
      category_id?: number;
    } = {};
    if (filterCategoryImageDto.category_id) {
      where.category_id = parseInt(filterCategoryImageDto.category_id);
    }

    const orderBy = {};
    if (filterCategoryImageDto.sort) {
      filterCategoryImageDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const categories = await this.prisma.category_image.findMany({
      select,
      where,
      skip: filterCategoryImageDto.offset
        ? parseInt(filterCategoryImageDto.offset)
        : undefined,
      take: filterCategoryImageDto.limit
        ? parseInt(filterCategoryImageDto.limit)
        : undefined,
      orderBy,
    });
    return categories;
  }

  async findOne(id: number): Promise<CategoryImage> {
    const CategoryImage = await this.prisma.category_image.findUnique({
      select,
      where: { category_id: id },
    });

    if (CategoryImage === null) {
      throw new BadRequestException('categoryimage not found');
    }

    return CategoryImage;
  }

  async update(
    id: number,
    updateCategoryImageDto: UpdateCategoryImageDto,
  ): Promise<CategoryImage> {
    try {
      const CategoryImage = await this.prisma.category_image.update({
        select,
        data: {
          category_id: updateCategoryImageDto.category_id,
        },
        where: {
          category_id: id,
        },
      });
      return CategoryImage;
    } catch (e) {
      console.log('Error in CategoryImageService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('categoryimage not found');
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.category_image.delete({ where: { category_id: id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('categoryimage not found');
      }
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceImage,
  FilterResidenceImageDto,
  CreateResidenceImageDto,
  UpdateResidenceImageDto,
} from './dto';

const select = {
  id: true,
  residence_id: true,
  url: true,
  width: true,
  height: true,
};

@Injectable()
export class ResidenceImageService {
  constructor(private prisma: PrismaService) {}

  async create(
    createResidenceImageDto: CreateResidenceImageDto,
    url: string,
  ): Promise<ResidenceImage> {
    try {
      const { file, residence_id, width, height } = createResidenceImageDto;
      const ResidenceImage: ResidenceImage =
        await this.prisma.residence_image.create({
          select,
          data: {
            residence_id: +residence_id,
            width: +width,
            height: +height,
            url,
          },
        });

      return ResidenceImage;
    } catch (e) {
      console.log('Error in ResidenceImageService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceImageDto: FilterResidenceImageDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
    } = {};
    if (filterResidenceImageDto.residence_id) {
      where.residence_id = parseInt(filterResidenceImageDto.residence_id);
    }

    const count = await this.prisma.residence_image.count({
      where,
    });
    return count;
  }

  async findAll(
    filterResidenceImageDto: FilterResidenceImageDto,
  ): Promise<ResidenceImage[]> {
    const where: {
      residence_id?: number;
    } = {};
    if (filterResidenceImageDto.residence_id) {
      where.residence_id = parseInt(filterResidenceImageDto.residence_id);
    }

    const orderBy = {};
    if (filterResidenceImageDto.sort) {
      filterResidenceImageDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const categories = await this.prisma.residence_image.findMany({
      select,
      where,
      skip: filterResidenceImageDto.offset
        ? parseInt(filterResidenceImageDto.offset)
        : undefined,
      take: filterResidenceImageDto.limit
        ? parseInt(filterResidenceImageDto.limit)
        : undefined,
      orderBy,
    });
    return categories;
  }

  async findOne(id: number): Promise<ResidenceImage> {
    const ResidenceImage = await this.prisma.residence_image.findUnique({
      select,
      where: { id },
    });

    if (ResidenceImage === null) {
      throw new BadRequestException('residenceimage not found');
    }

    return ResidenceImage;
  }

  async update(
    id: number,
    updateResidenceImageDto: UpdateResidenceImageDto,
  ): Promise<ResidenceImage> {
    try {
      const ResidenceImage = await this.prisma.residence_image.update({
        select,
        data: {
          residence_id: updateResidenceImageDto.residence_id,
        },
        where: {
          id,
        },
      });
      return ResidenceImage;
    } catch (e) {
      console.log('Error in ResidenceImageService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residenceimage not found');
      }
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_image.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residenceimage not found');
      }
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceServe,
  FilterResidenceServeDto,
  CreateResidenceServeDto,
  UpdateResidenceServeDto,
} from './dto';

const select = {
  residence_id: true,
  plate: true,
  fork_spoon: true,
  knife: true,
  bowl: true,
  glass: true,
  teapot: true,
  kettle: true,
  samovar: true,
  tea_maker: true,
  salt_shaker: true,
  tablecloth: true,
  dining_table: true,
  child_chair: true,
  tissue_paper: true,
};

@Injectable()
export class ResidenceServeService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceServeDto: CreateResidenceServeDto,
  ): Promise<ResidenceServe> {
    try {
      const residence_serve_attribute =
        await this.prisma.residence_serve_attribute.create({
          select,
          data: createResidenceServeDto,
        });
      return residence_serve_attribute;
    } catch (e) {
      console.log('Error in ResidenceServeService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceServeDto: FilterResidenceServeDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      plate?: boolean;
      fork_spoon?: boolean;
      knife?: boolean;
      bowl?: boolean;
      glass?: boolean;
      teapot?: boolean;
      kettle?: boolean;
      samovar?: boolean;
      tea_maker?: boolean;
    } = {};
    if (filterResidenceServeDto.residence_id) {
      where.residence_id = parseInt(filterResidenceServeDto.residence_id);
    } else if (filterResidenceServeDto.plate) {
      where.plate = filterResidenceServeDto.plate === 'true';
    } else if (filterResidenceServeDto.fork_spoon) {
      where.fork_spoon = filterResidenceServeDto.fork_spoon === 'true';
    } else if (filterResidenceServeDto.knife) {
      where.knife = filterResidenceServeDto.knife === 'true';
    } else if (filterResidenceServeDto.bowl) {
      where.bowl = filterResidenceServeDto.bowl === 'true';
    } else if (filterResidenceServeDto.glass) {
      where.glass = filterResidenceServeDto.glass === 'true';
    } else if (filterResidenceServeDto.teapot) {
      where.teapot = filterResidenceServeDto.teapot === 'true';
    } else if (filterResidenceServeDto.kettle) {
      where.kettle = filterResidenceServeDto.kettle === 'true';
    } else if (filterResidenceServeDto.samovar) {
      where.samovar = filterResidenceServeDto.samovar === 'true';
    } else if (filterResidenceServeDto.tea_maker) {
      where.tea_maker = filterResidenceServeDto.tea_maker === 'true';
    }

    const residence_serve_attributes =
      await this.prisma.residence_serve_attribute.count({
        where,
      });
    return residence_serve_attributes;
  }

  async findAll(
    filterResidenceServeDto: FilterResidenceServeDto,
  ): Promise<ResidenceServe[]> {
    const where: {
      residence_id?: number;
      plate?: boolean;
      fork_spoon?: boolean;
      knife?: boolean;
      bowl?: boolean;
      glass?: boolean;
      teapot?: boolean;
      kettle?: boolean;
      samovar?: boolean;
      tea_maker?: boolean;
    } = {};
    if (filterResidenceServeDto.residence_id) {
      where.residence_id = parseInt(filterResidenceServeDto.residence_id);
    } else if (filterResidenceServeDto.plate) {
      where.plate = filterResidenceServeDto.plate === 'true';
    } else if (filterResidenceServeDto.fork_spoon) {
      where.fork_spoon = filterResidenceServeDto.fork_spoon === 'true';
    } else if (filterResidenceServeDto.knife) {
      where.knife = filterResidenceServeDto.knife === 'true';
    } else if (filterResidenceServeDto.bowl) {
      where.bowl = filterResidenceServeDto.bowl === 'true';
    } else if (filterResidenceServeDto.glass) {
      where.glass = filterResidenceServeDto.glass === 'true';
    } else if (filterResidenceServeDto.teapot) {
      where.teapot = filterResidenceServeDto.teapot === 'true';
    } else if (filterResidenceServeDto.kettle) {
      where.kettle = filterResidenceServeDto.kettle === 'true';
    } else if (filterResidenceServeDto.samovar) {
      where.samovar = filterResidenceServeDto.samovar === 'true';
    } else if (filterResidenceServeDto.tea_maker) {
      where.tea_maker = filterResidenceServeDto.tea_maker === 'true';
    }

    const orderBy = {};
    if (filterResidenceServeDto.sort) {
      filterResidenceServeDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_serve_attributes =
      await this.prisma.residence_serve_attribute.findMany({
        select,
        where,
        skip: filterResidenceServeDto.offset
          ? parseInt(filterResidenceServeDto.offset)
          : undefined,
        take: filterResidenceServeDto.limit
          ? parseInt(filterResidenceServeDto.limit)
          : undefined,
        orderBy,
      });
    return residence_serve_attributes;
  }

  async findOne(id: number): Promise<ResidenceServe> {
    const residence_serve_attribute =
      await this.prisma.residence_serve_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_serve_attribute === null) {
      throw new BadRequestException('residence_serve_attribute not found');
    }

    return residence_serve_attribute;
  }

  async update(
    id: number,
    updateResidenceServeDto: UpdateResidenceServeDto,
  ): Promise<ResidenceServe> {
    try {
      const residence_serve_attribute =
        await this.prisma.residence_serve_attribute.update({
          select,
          data: {
            plate: updateResidenceServeDto.plate,
            fork_spoon: updateResidenceServeDto.fork_spoon,
            knife: updateResidenceServeDto.knife,
            bowl: updateResidenceServeDto.bowl,
            glass: updateResidenceServeDto.glass,
            teapot: updateResidenceServeDto.teapot,
            kettle: updateResidenceServeDto.kettle,
            samovar: updateResidenceServeDto.samovar,
            tea_maker: updateResidenceServeDto.tea_maker,
            salt_shaker: updateResidenceServeDto.tea_maker,
            tablecloth: updateResidenceServeDto.tablecloth,
            dining_table: updateResidenceServeDto.dining_table,
            child_chair: updateResidenceServeDto.child_chair,
            tissue_paper: updateResidenceServeDto.tissue_paper,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_serve_attribute;
    } catch (e) {
      console.log('Error in ResidenceServeService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_serve_attribute not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_serve_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_serve_attribute not found');
      }
    }
  }
}

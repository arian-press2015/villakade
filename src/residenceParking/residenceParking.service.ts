import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceParking,
  FilterResidenceParkingDto,
  CreateResidenceParkingDto,
  UpdateResidenceParkingDto,
} from './dto';

const select = {
  residence_id: true,
  roof: true,
  unroofed: true,
  public: true,
  free_space: true,
  capacity: true,
};

@Injectable()
export class ResidenceParkingService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceParkingDto: CreateResidenceParkingDto,
  ): Promise<ResidenceParking> {
    try {
      const residence_parking_attribute =
        await this.prisma.residence_parking_attribute.create({
          select,
          data: createResidenceParkingDto,
        });
      return residence_parking_attribute;
    } catch (e) {
      console.log('Error in ResidenceParkingService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceParkingDto: FilterResidenceParkingDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      roof?: boolean;
      unroofed?: boolean;
      public?: boolean;
      free_space?: boolean;
      capacity?: { gt?: number; lt?: number };
    } = {};
    if (filterResidenceParkingDto.residence_id) {
      where.residence_id = parseInt(filterResidenceParkingDto.residence_id);
    } else if (filterResidenceParkingDto.roof) {
      where.roof = filterResidenceParkingDto.roof === 'true';
    } else if (filterResidenceParkingDto.unroofed) {
      where.unroofed = filterResidenceParkingDto.unroofed === 'true';
    } else if (filterResidenceParkingDto.public) {
      where.public = filterResidenceParkingDto.public === 'true';
    } else if (filterResidenceParkingDto.free_space) {
      where.free_space = filterResidenceParkingDto.free_space === 'true';
    } else if (
      filterResidenceParkingDto.min_capacity ||
      filterResidenceParkingDto.max_capacity
    ) {
      where.capacity = {
        gt: filterResidenceParkingDto.min_capacity
          ? parseInt(filterResidenceParkingDto.min_capacity)
          : undefined,
        lt: filterResidenceParkingDto.max_capacity
          ? parseInt(filterResidenceParkingDto.max_capacity)
          : undefined,
      };
    }

    const residence_parking_attributes =
      await this.prisma.residence_parking_attribute.count({
        where,
      });
    return residence_parking_attributes;
  }

  async findAll(
    filterResidenceParkingDto: FilterResidenceParkingDto,
  ): Promise<ResidenceParking[]> {
    const where: {
      residence_id?: number;
      roof?: boolean;
      unroofed?: boolean;
      public?: boolean;
      free_space?: boolean;
      capacity?: { gt?: number; lt?: number };
    } = {};
    if (filterResidenceParkingDto.residence_id) {
      where.residence_id = parseInt(filterResidenceParkingDto.residence_id);
    } else if (filterResidenceParkingDto.roof) {
      where.roof = filterResidenceParkingDto.roof === 'true';
    } else if (filterResidenceParkingDto.unroofed) {
      where.unroofed = filterResidenceParkingDto.unroofed === 'true';
    } else if (filterResidenceParkingDto.public) {
      where.public = filterResidenceParkingDto.public === 'true';
    } else if (filterResidenceParkingDto.free_space) {
      where.free_space = filterResidenceParkingDto.free_space === 'true';
    } else if (
      filterResidenceParkingDto.min_capacity ||
      filterResidenceParkingDto.max_capacity
    ) {
      where.capacity = {
        gt: filterResidenceParkingDto.min_capacity
          ? parseInt(filterResidenceParkingDto.min_capacity)
          : undefined,
        lt: filterResidenceParkingDto.max_capacity
          ? parseInt(filterResidenceParkingDto.max_capacity)
          : undefined,
      };
    }

    const orderBy = {};
    if (filterResidenceParkingDto.sort) {
      filterResidenceParkingDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_parking_attributes =
      await this.prisma.residence_parking_attribute.findMany({
        select,
        where,
        skip: filterResidenceParkingDto.offset
          ? parseInt(filterResidenceParkingDto.offset)
          : undefined,
        take: filterResidenceParkingDto.limit
          ? parseInt(filterResidenceParkingDto.limit)
          : undefined,
        orderBy,
      });
    return residence_parking_attributes;
  }

  async findOne(id: number): Promise<ResidenceParking> {
    const residence_parking_attribute =
      await this.prisma.residence_parking_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_parking_attribute === null) {
      throw new BadRequestException('residence_parking_attribute not found');
    }

    return residence_parking_attribute;
  }

  async update(
    id: number,
    updateResidenceParkingDto: UpdateResidenceParkingDto,
  ): Promise<ResidenceParking> {
    try {
      const residence_parking_attribute =
        await this.prisma.residence_parking_attribute.update({
          select,
          data: {
            roof: updateResidenceParkingDto.roof,
            unroofed: updateResidenceParkingDto.unroofed,
            public: updateResidenceParkingDto.public,
            free_space: updateResidenceParkingDto.free_space,
            capacity: updateResidenceParkingDto.capacity,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_parking_attribute;
    } catch (e) {
      console.log('Error in ResidenceParkingService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_parking_attribute not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_parking_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_parking_attribute not found');
      }
    }
  }
}

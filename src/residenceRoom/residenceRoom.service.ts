import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceRoom,
  FilterResidenceRoomDto,
  CreateResidenceRoomDto,
  UpdateResidenceRoomDto,
} from './dto';

const select = {
  residence_id: true,
  count: true,
  wall_closet: true,
  drawer: true,
  hanger: true,
  double_bed: true,
  single_bed: true,
  carpet: true,
  heating_system: true,
  cooling_system: true,
};

@Injectable()
export class ResidenceRoomService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceRoomDto: CreateResidenceRoomDto,
  ): Promise<ResidenceRoom> {
    try {
      const residence_room_attribute =
        await this.prisma.residence_room_attribute.create({
          select,
          data: createResidenceRoomDto,
        });
      return residence_room_attribute;
    } catch (e) {
      console.log('Error in ResidenceRoomService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceRoomDto: FilterResidenceRoomDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      count?: { gt?: number; lt?: number };
      wall_closet?: boolean;
      drawer?: boolean;
      hanger?: boolean;
      double_bed?: boolean;
      single_bed?: boolean;
      carpet?: boolean;
      heating_system?: boolean;
      cooling_system?: boolean;
    } = {};
    if (filterResidenceRoomDto.residence_id) {
      where.residence_id = parseInt(filterResidenceRoomDto.residence_id);
    } else if (
      filterResidenceRoomDto.min_count ||
      filterResidenceRoomDto.max_count
    ) {
      where.count = {
        gt: filterResidenceRoomDto.min_count
          ? parseInt(filterResidenceRoomDto.min_count)
          : undefined,
        lt: filterResidenceRoomDto.max_count
          ? parseInt(filterResidenceRoomDto.max_count)
          : undefined,
      };
    } else if (filterResidenceRoomDto.wall_closet) {
      where.wall_closet = filterResidenceRoomDto.wall_closet === 'true';
    } else if (filterResidenceRoomDto.drawer) {
      where.drawer = filterResidenceRoomDto.drawer === 'true';
    } else if (filterResidenceRoomDto.hanger) {
      where.hanger = filterResidenceRoomDto.hanger === 'true';
    } else if (filterResidenceRoomDto.double_bed) {
      where.double_bed = filterResidenceRoomDto.double_bed === 'true';
    } else if (filterResidenceRoomDto.single_bed) {
      where.single_bed = filterResidenceRoomDto.single_bed === 'true';
    } else if (filterResidenceRoomDto.carpet) {
      where.carpet = filterResidenceRoomDto.carpet === 'true';
    } else if (filterResidenceRoomDto.heating_system) {
      where.heating_system = filterResidenceRoomDto.heating_system === 'true';
    } else if (filterResidenceRoomDto.cooling_system) {
      where.cooling_system = filterResidenceRoomDto.cooling_system === 'true';
    }

    const residence_room_attributes =
      await this.prisma.residence_room_attribute.count({
        where,
      });
    return residence_room_attributes;
  }

  async findAll(
    filterResidenceRoomDto: FilterResidenceRoomDto,
  ): Promise<ResidenceRoom[]> {
    const where: {
      residence_id?: number;
      count?: { gt?: number; lt?: number };
      wall_closet?: boolean;
      drawer?: boolean;
      hanger?: boolean;
      double_bed?: boolean;
      single_bed?: boolean;
      carpet?: boolean;
      heating_system?: boolean;
      cooling_system?: boolean;
    } = {};
    if (filterResidenceRoomDto.residence_id) {
      where.residence_id = parseInt(filterResidenceRoomDto.residence_id);
    } else if (
      filterResidenceRoomDto.min_count ||
      filterResidenceRoomDto.max_count
    ) {
      where.count = {
        gt: filterResidenceRoomDto.min_count
          ? parseInt(filterResidenceRoomDto.min_count)
          : undefined,
        lt: filterResidenceRoomDto.max_count
          ? parseInt(filterResidenceRoomDto.max_count)
          : undefined,
      };
    } else if (filterResidenceRoomDto.wall_closet) {
      where.wall_closet = filterResidenceRoomDto.wall_closet === 'true';
    } else if (filterResidenceRoomDto.drawer) {
      where.drawer = filterResidenceRoomDto.drawer === 'true';
    } else if (filterResidenceRoomDto.hanger) {
      where.hanger = filterResidenceRoomDto.hanger === 'true';
    } else if (filterResidenceRoomDto.double_bed) {
      where.double_bed = filterResidenceRoomDto.double_bed === 'true';
    } else if (filterResidenceRoomDto.single_bed) {
      where.single_bed = filterResidenceRoomDto.single_bed === 'true';
    } else if (filterResidenceRoomDto.carpet) {
      where.carpet = filterResidenceRoomDto.carpet === 'true';
    } else if (filterResidenceRoomDto.heating_system) {
      where.heating_system = filterResidenceRoomDto.heating_system === 'true';
    } else if (filterResidenceRoomDto.cooling_system) {
      where.cooling_system = filterResidenceRoomDto.cooling_system === 'true';
    }

    const orderBy = {};
    if (filterResidenceRoomDto.sort) {
      filterResidenceRoomDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_room_attributes =
      await this.prisma.residence_room_attribute.findMany({
        select,
        where,
        skip: filterResidenceRoomDto.offset
          ? parseInt(filterResidenceRoomDto.offset)
          : undefined,
        take: filterResidenceRoomDto.limit
          ? parseInt(filterResidenceRoomDto.limit)
          : undefined,
        orderBy,
      });
    return residence_room_attributes;
  }

  async findOne(id: number): Promise<ResidenceRoom> {
    const residence_room_attribute =
      await this.prisma.residence_room_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_room_attribute === null) {
      throw new BadRequestException('residence_room_attribute not found');
    }

    return residence_room_attribute;
  }

  async update(
    id: number,
    updateResidenceRoomDto: UpdateResidenceRoomDto,
  ): Promise<ResidenceRoom> {
    try {
      const residence_room_attribute =
        await this.prisma.residence_room_attribute.update({
          select,
          data: {
            count: updateResidenceRoomDto.count,
            wall_closet: updateResidenceRoomDto.wall_closet,
            drawer: updateResidenceRoomDto.drawer,
            hanger: updateResidenceRoomDto.hanger,
            double_bed: updateResidenceRoomDto.double_bed,
            single_bed: updateResidenceRoomDto.single_bed,
            carpet: updateResidenceRoomDto.carpet,
            heating_system: updateResidenceRoomDto.heating_system,
            cooling_system: updateResidenceRoomDto.cooling_system,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_room_attribute;
    } catch (e) {
      console.log('Error in ResidenceRoomService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_room_attribute not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_room_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_room_attribute not found');
      }
    }
  }
}

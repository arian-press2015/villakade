import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
} from './dto';

const select = {
  id: true,
  host_id: true,
  title: true,
  type: {
    select: {
      id: true,
      title: true,
      fa_title: true,
    },
  },
  location: true,
  price: true,
  active: true,
  city: {
    select: {
      id: true,
      name: true,
      fa_name: true,
      total_residence_count: true,
      province: {
        select: {
          id: true,
          name: true,
          fa_name: true,
        },
      },
    },
  },
};

@Injectable()
export class ResidenceService {
  constructor(private prisma: PrismaService) {}

  async create(createResidenceDto: CreateResidenceDto): Promise<Residence> {
    try {
      const { active, ...dto } = createResidenceDto;
      const residence: Residence = await this.prisma.residence.create({
        select,
        data: { ...dto, active: false },
      });

      return residence;
    } catch (e) {
      console.log('Error in ResidenceService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(filterResidenceDto: FilterResidenceDto): Promise<number> {
    const where: {
      title?: { contains: string };
      host_id?: number;
      type_id?: number;
      city_id?: number;
      price?: number;
      active?: boolean;
      location?: { contains: string };
    } = {};
    if (filterResidenceDto.title) {
      where.title = {
        contains: filterResidenceDto.title,
      };
    } else if (filterResidenceDto.host_id) {
      where.host_id = parseInt(filterResidenceDto.host_id);
    } else if (filterResidenceDto.type_id) {
      where.type_id = parseInt(filterResidenceDto.type_id);
    } else if (filterResidenceDto.city_id) {
      where.city_id = parseInt(filterResidenceDto.city_id);
    } else if (filterResidenceDto.price) {
      where.price = parseInt(filterResidenceDto.price);
    } else if (filterResidenceDto.active) {
      where.active = filterResidenceDto.active === 'true' ? true : false;
    } else if (filterResidenceDto.location) {
      where.location = {
        contains: filterResidenceDto.location,
      };
    }

    const residences = await this.prisma.residence.count({
      where,
    });
    return residences;
  }

  async findAll(filterResidenceDto: FilterResidenceDto): Promise<Residence[]> {
    const where: {
      title?: { contains: string };
      host_id?: number;
      type_id?: number;
      city_id?: number;
      price?: number;
      active?: boolean;
      location?: { contains: string };
    } = {};
    if (filterResidenceDto.title) {
      where.title = {
        contains: filterResidenceDto.title,
      };
    } else if (filterResidenceDto.host_id) {
      where.host_id = parseInt(filterResidenceDto.host_id);
    } else if (filterResidenceDto.type_id) {
      where.type_id = parseInt(filterResidenceDto.type_id);
    } else if (filterResidenceDto.city_id) {
      where.city_id = parseInt(filterResidenceDto.city_id);
    } else if (filterResidenceDto.price) {
      where.price = parseInt(filterResidenceDto.price);
    } else if (filterResidenceDto.active) {
      where.active = filterResidenceDto.active === 'true' ? true : false;
    } else if (filterResidenceDto.location) {
      where.location = {
        contains: filterResidenceDto.location,
      };
    }

    const orderBy = {};
    if (filterResidenceDto.sort) {
      filterResidenceDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residences = await this.prisma.residence.findMany({
      select,
      where,
      skip: filterResidenceDto.offset
        ? parseInt(filterResidenceDto.offset)
        : undefined,
      take: filterResidenceDto.limit
        ? parseInt(filterResidenceDto.limit)
        : undefined,
      orderBy,
    });
    return residences;
  }

  async findOne(id: number): Promise<Residence> {
    const residence = await this.prisma.residence.findUnique({
      select,
      where: { id },
    });

    if (residence === null) {
      throw new BadRequestException('residence not found');
    }

    return residence;
  }

  async update(
    id: number,
    updateResidenceDto: UpdateResidenceDto,
    host_id: number,
  ): Promise<Residence> {
    try {
      const residencefound = await this.prisma.residence.findUnique({
        where: { id },
      });

      if (!residencefound) {
        throw new BadRequestException('residence not found');
      }

      if (residencefound.host_id !== host_id) {
        throw new BadRequestException("you don't have permission to do that");
      }

      const residence = await this.prisma.residence.update({
        select,
        data: {
          title: updateResidenceDto.title,
          city_id: updateResidenceDto.city_id,
          location: updateResidenceDto.location,
          price: updateResidenceDto.price,
          type_id: updateResidenceDto.type_id,
        },
        where: {
          id,
        },
      });
      return residence;
    } catch (e) {
      throw e;
    }
  }

  async remove(id: number, host_id: number): Promise<void> {
    try {
      const residence = await this.prisma.residence.findUnique({
        where: { id },
      });

      if (!residence) {
        throw new BadRequestException('residence not found');
      }

      if (residence.host_id !== host_id) {
        throw new BadRequestException("you don't have permission to do that");
      }

      await this.prisma.residence.update({
        where: { id },
        data: {
          active: false,
        },
      });
      return;
    } catch (e) {
      throw e;
    }
  }
}

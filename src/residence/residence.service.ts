import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
  CreateResidenceCategoryDto,
  ResidenceCategory,
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
  normal_capacity: true,
  max_capacity: true,
  about: true,
  residence_price: {
    select: {
      residence_id: true,
      weekday_price: true,
      weekend_price: true,
      peak_price: true,
      extra_guest_weekday: true,
      extra_guest_weekend: true,
      extra_guest_peak: true,
    },
  },
  residence_image: {
    select: {
      id: true,
      residence_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
  residence_category: {
    select: {
      category: {
        select: {
          id: true,
          title: true,
          fa_title: true,
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

  async createResidenceCategory(
    createResidenceCategoryDto: CreateResidenceCategoryDto,
  ): Promise<void> {
    try {
      const data: ResidenceCategory[] =
        createResidenceCategoryDto.category_id.map((cat) => ({
          residence_id: createResidenceCategoryDto.residence_id,
          category_id: cat,
        }));
      await this.prisma.residence_category.createMany({
        data,
      });

      return;
    } catch (e) {
      console.log(
        'Error in ResidenceService.createResidenceCategory()',
        e.code,
        e.meta,
      );
      if (
        e.code &&
        e.code === 'P2003' &&
        e.meta.field_name === 'residence_id'
      ) {
        throw new BadRequestException('residence not found');
      } else if (
        e.code &&
        e.code === 'P2003' &&
        e.meta.field_name === 'category_id'
      ) {
        throw new BadRequestException('category not found');
      } else if (e.code && e.code === 'P2002' && e.meta.target === 'PRIMARY') {
        throw new BadRequestException('residenceCategory already exists');
      }
      throw e;
    }
  }

  async getCount(filterResidenceDto: FilterResidenceDto): Promise<number> {
    const where: {
      title?: { contains: string };
      host_id?: number;
      type_id?: number;
      city_id?: number;
      active?: boolean;
      location?: { contains: string };
      weekday_price?: { gt?: number; lt?: number };
      weekend_price?: { gt?: number; lt?: number };
      peak_price?: { gt?: number; lt?: number };
      extra_guest_weekday?: { gt?: number; lt?: number };
      extra_guest_weekend?: { gt?: number; lt?: number };
      extra_guest_peak?: { gt?: number; lt?: number };
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
    } else if (filterResidenceDto.active) {
      where.active = filterResidenceDto.active === 'true' ? true : false;
    } else if (filterResidenceDto.location) {
      where.location = {
        contains: filterResidenceDto.location,
      };
    } else if (
      filterResidenceDto.min_weekday_price ||
      filterResidenceDto.max_weekday_price
    ) {
      where.weekday_price = {
        gt: filterResidenceDto.min_weekday_price
          ? parseInt(filterResidenceDto.min_weekday_price)
          : undefined,
        lt: filterResidenceDto.max_weekday_price
          ? parseInt(filterResidenceDto.max_weekday_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_weekend_price ||
      filterResidenceDto.max_weekend_price
    ) {
      where.weekend_price = {
        gt: filterResidenceDto.min_weekend_price
          ? parseInt(filterResidenceDto.min_weekend_price)
          : undefined,
        lt: filterResidenceDto.max_weekend_price
          ? parseInt(filterResidenceDto.max_weekend_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_peak_price ||
      filterResidenceDto.max_peak_price
    ) {
      where.peak_price = {
        gt: filterResidenceDto.min_peak_price
          ? parseInt(filterResidenceDto.min_peak_price)
          : undefined,
        lt: filterResidenceDto.max_peak_price
          ? parseInt(filterResidenceDto.max_peak_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_weekday ||
      filterResidenceDto.max_extra_guest_weekday
    ) {
      where.extra_guest_weekday = {
        gt: filterResidenceDto.min_extra_guest_weekday
          ? parseInt(filterResidenceDto.min_extra_guest_weekday)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_weekday
          ? parseInt(filterResidenceDto.max_extra_guest_weekday)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_weekend ||
      filterResidenceDto.max_extra_guest_weekend
    ) {
      where.extra_guest_weekend = {
        gt: filterResidenceDto.min_extra_guest_weekend
          ? parseInt(filterResidenceDto.min_extra_guest_weekend)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_weekend
          ? parseInt(filterResidenceDto.max_extra_guest_weekend)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_peak ||
      filterResidenceDto.max_extra_guest_peak
    ) {
      where.extra_guest_peak = {
        gt: filterResidenceDto.min_extra_guest_peak
          ? parseInt(filterResidenceDto.min_extra_guest_peak)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_peak
          ? parseInt(filterResidenceDto.max_extra_guest_peak)
          : undefined,
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
      active?: boolean;
      location?: { contains: string };
      weekday_price?: { gt?: number; lt?: number };
      weekend_price?: { gt?: number; lt?: number };
      peak_price?: { gt?: number; lt?: number };
      extra_guest_weekday?: { gt?: number; lt?: number };
      extra_guest_weekend?: { gt?: number; lt?: number };
      extra_guest_peak?: { gt?: number; lt?: number };
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
    } else if (filterResidenceDto.active) {
      where.active = filterResidenceDto.active === 'true' ? true : false;
    } else if (filterResidenceDto.location) {
      where.location = {
        contains: filterResidenceDto.location,
      };
    } else if (
      filterResidenceDto.min_weekday_price ||
      filterResidenceDto.max_weekday_price
    ) {
      where.weekday_price = {
        gt: filterResidenceDto.min_weekday_price
          ? parseInt(filterResidenceDto.min_weekday_price)
          : undefined,
        lt: filterResidenceDto.max_weekday_price
          ? parseInt(filterResidenceDto.max_weekday_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_weekend_price ||
      filterResidenceDto.max_weekend_price
    ) {
      where.weekend_price = {
        gt: filterResidenceDto.min_weekend_price
          ? parseInt(filterResidenceDto.min_weekend_price)
          : undefined,
        lt: filterResidenceDto.max_weekend_price
          ? parseInt(filterResidenceDto.max_weekend_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_peak_price ||
      filterResidenceDto.max_peak_price
    ) {
      where.peak_price = {
        gt: filterResidenceDto.min_peak_price
          ? parseInt(filterResidenceDto.min_peak_price)
          : undefined,
        lt: filterResidenceDto.max_peak_price
          ? parseInt(filterResidenceDto.max_peak_price)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_weekday ||
      filterResidenceDto.max_extra_guest_weekday
    ) {
      where.extra_guest_weekday = {
        gt: filterResidenceDto.min_extra_guest_weekday
          ? parseInt(filterResidenceDto.min_extra_guest_weekday)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_weekday
          ? parseInt(filterResidenceDto.max_extra_guest_weekday)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_weekend ||
      filterResidenceDto.max_extra_guest_weekend
    ) {
      where.extra_guest_weekend = {
        gt: filterResidenceDto.min_extra_guest_weekend
          ? parseInt(filterResidenceDto.min_extra_guest_weekend)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_weekend
          ? parseInt(filterResidenceDto.max_extra_guest_weekend)
          : undefined,
      };
    } else if (
      filterResidenceDto.min_extra_guest_peak ||
      filterResidenceDto.max_extra_guest_peak
    ) {
      where.extra_guest_peak = {
        gt: filterResidenceDto.min_extra_guest_peak
          ? parseInt(filterResidenceDto.min_extra_guest_peak)
          : undefined,
        lt: filterResidenceDto.max_extra_guest_peak
          ? parseInt(filterResidenceDto.max_extra_guest_peak)
          : undefined,
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
          type_id: updateResidenceDto.type_id,
          normal_capacity: updateResidenceDto.normal_capacity,
          max_capacity: updateResidenceDto.max_capacity,
          about: updateResidenceDto.about,
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

  async checkHost(id: number, host_id: number): Promise<boolean> {
    const residence = await this.prisma.residence.findUnique({
      select: {
        id: true,
        host_id: true,
      },
      where: { id },
    });

    if (!residence) {
      throw new BadRequestException('residence not found');
    }

    if (residence.host_id === host_id) {
      return true;
    } else {
      return false;
    }
  }
}

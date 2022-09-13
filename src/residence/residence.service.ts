import { Injectable } from '@nestjs/common';
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
    return 1;
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
    const residence = {
      id,
      host_id: 123,
      title: 'آپارتمان در شیراز',
      type: {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
      location: 'شیراز دست چپ پلاک ۲',
      price: 200000,
      active: true,
      city: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
        province: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
        },
      },
      images: [
        {
          residence_id: 1,
          url: '/fake/image/url',
          width: 480,
          height: 640,
        },
      ],
    };
    return residence;
  }

  async update(
    id: number,
    updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    const residence = {
      id,
      host_id: updateResidenceDto.host_id || 123,
      title: updateResidenceDto.title || 'آپارتمان در شیراز',
      type: {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
      location: updateResidenceDto.location || 'شیراز دست چپ پلاک دو',
      price: updateResidenceDto.price || 200000,
      active: updateResidenceDto.active || true,
      city: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
        province: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
        },
      },
      images: [
        {
          residence_id: 1,
          url: '/fake/image/url',
          width: 480,
          height: 640,
        },
      ],
    };
    return residence;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

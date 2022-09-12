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
  images: {
    select: {
      residence_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
};

@Injectable()
export class ResidenceService {
  constructor(private prisma: PrismaService) {}

  async create(createResidenceDto: CreateResidenceDto): Promise<Residence> {
    try {
      const { active, ...dto } = createResidenceDto;
      const residence = await this.prisma.residence.create({
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
    const residence = [
      {
        id: 1,
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
      },
    ];
    return residence;
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

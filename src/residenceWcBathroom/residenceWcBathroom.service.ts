import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceWcBathroom,
  FilterResidenceWcBathroomDto,
  CreateResidenceWcBathroomDto,
  UpdateResidenceWcBathroomDto,
} from './dto';

const select = {
  residence_id: true,
  location: true,
  local_wc: true,
  fix_wc: true,
  portable_wc: true,
  shower: true,
  jacuzzi: true,
  bathtub: true,
  soap: true,
  shampoo: true,
  shared_wc_bathroom: true,
};

@Injectable()
export class ResidenceWcBathroomService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceWcBathroomDto: CreateResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom> {
    try {
      const residence_wc_bathroom =
        await this.prisma.residence_wc_bathroom.create({
          select,
          data: createResidenceWcBathroomDto,
        });
      return residence_wc_bathroom;
    } catch (e) {
      console.log(
        'Error in ResidenceWcBathroomService.create()',
        e.code,
        e.meta,
      );
      throw e;
    }
  }

  async getCount(
    filterResidenceWcBathroomDto: FilterResidenceWcBathroomDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      location?: { contains: string };
      local_wc?: boolean;
      fix_wc?: boolean;
      portable_wc?: boolean;
      shower?: boolean;
      jacuzzi?: boolean;
      bathtub?: boolean;
      soap?: boolean;
      shampoo?: boolean;
      shared_wc_bathroom?: boolean;
    } = {};
    if (filterResidenceWcBathroomDto.residence_id) {
      where.residence_id = parseInt(filterResidenceWcBathroomDto.residence_id);
    } else if (filterResidenceWcBathroomDto.location) {
      where.location = { contains: filterResidenceWcBathroomDto.location };
    } else if (filterResidenceWcBathroomDto.local_wc) {
      where.local_wc = filterResidenceWcBathroomDto.local_wc === 'true';
    } else if (filterResidenceWcBathroomDto.fix_wc) {
      where.fix_wc = filterResidenceWcBathroomDto.fix_wc === 'true';
    } else if (filterResidenceWcBathroomDto.portable_wc) {
      where.portable_wc = filterResidenceWcBathroomDto.portable_wc === 'true';
    } else if (filterResidenceWcBathroomDto.shower) {
      where.shower = filterResidenceWcBathroomDto.shower === 'true';
    } else if (filterResidenceWcBathroomDto.jacuzzi) {
      where.jacuzzi = filterResidenceWcBathroomDto.jacuzzi === 'true';
    } else if (filterResidenceWcBathroomDto.bathtub) {
      where.bathtub = filterResidenceWcBathroomDto.bathtub === 'true';
    } else if (filterResidenceWcBathroomDto.soap) {
      where.soap = filterResidenceWcBathroomDto.soap === 'true';
    } else if (filterResidenceWcBathroomDto.shampoo) {
      where.shampoo = filterResidenceWcBathroomDto.shampoo === 'true';
    } else if (filterResidenceWcBathroomDto.shared_wc_bathroom) {
      where.shared_wc_bathroom =
        filterResidenceWcBathroomDto.shared_wc_bathroom === 'true';
    }

    const residence_wc_bathrooms =
      await this.prisma.residence_wc_bathroom.count({
        where,
      });
    return residence_wc_bathrooms;
  }

  async findAll(
    filterResidenceWcBathroomDto: FilterResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom[]> {
    const where: {
      residence_id?: number;
      location?: { contains: string };
      local_wc?: boolean;
      fix_wc?: boolean;
      portable_wc?: boolean;
      shower?: boolean;
      jacuzzi?: boolean;
      bathtub?: boolean;
      soap?: boolean;
      shampoo?: boolean;
      shared_wc_bathroom?: boolean;
    } = {};
    if (filterResidenceWcBathroomDto.residence_id) {
      where.residence_id = parseInt(filterResidenceWcBathroomDto.residence_id);
    } else if (filterResidenceWcBathroomDto.location) {
      where.location = { contains: filterResidenceWcBathroomDto.location };
    } else if (filterResidenceWcBathroomDto.local_wc) {
      where.local_wc = filterResidenceWcBathroomDto.local_wc === 'true';
    } else if (filterResidenceWcBathroomDto.fix_wc) {
      where.fix_wc = filterResidenceWcBathroomDto.fix_wc === 'true';
    } else if (filterResidenceWcBathroomDto.portable_wc) {
      where.portable_wc = filterResidenceWcBathroomDto.portable_wc === 'true';
    } else if (filterResidenceWcBathroomDto.shower) {
      where.shower = filterResidenceWcBathroomDto.shower === 'true';
    } else if (filterResidenceWcBathroomDto.jacuzzi) {
      where.jacuzzi = filterResidenceWcBathroomDto.jacuzzi === 'true';
    } else if (filterResidenceWcBathroomDto.bathtub) {
      where.bathtub = filterResidenceWcBathroomDto.bathtub === 'true';
    } else if (filterResidenceWcBathroomDto.soap) {
      where.soap = filterResidenceWcBathroomDto.soap === 'true';
    } else if (filterResidenceWcBathroomDto.shampoo) {
      where.shampoo = filterResidenceWcBathroomDto.shampoo === 'true';
    } else if (filterResidenceWcBathroomDto.shared_wc_bathroom) {
      where.shared_wc_bathroom =
        filterResidenceWcBathroomDto.shared_wc_bathroom === 'true';
    }

    const orderBy = {};
    if (filterResidenceWcBathroomDto.sort) {
      filterResidenceWcBathroomDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_wc_bathrooms =
      await this.prisma.residence_wc_bathroom.findMany({
        select,
        where,
        skip: filterResidenceWcBathroomDto.offset
          ? parseInt(filterResidenceWcBathroomDto.offset)
          : undefined,
        take: filterResidenceWcBathroomDto.limit
          ? parseInt(filterResidenceWcBathroomDto.limit)
          : undefined,
        orderBy,
      });
    return residence_wc_bathrooms;
  }

  async findOne(id: number): Promise<ResidenceWcBathroom> {
    const residence_wc_bathroom =
      await this.prisma.residence_wc_bathroom.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_wc_bathroom === null) {
      throw new BadRequestException('residence_wc_bathroom not found');
    }

    return residence_wc_bathroom;
  }

  async update(
    id: number,
    updateResidenceWcBathroomDto: UpdateResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom> {
    try {
      const residence_wc_bathroom =
        await this.prisma.residence_wc_bathroom.update({
          select,
          data: {
            location: updateResidenceWcBathroomDto.location,
            local_wc: updateResidenceWcBathroomDto.local_wc,
            fix_wc: updateResidenceWcBathroomDto.fix_wc,
            portable_wc: updateResidenceWcBathroomDto.portable_wc,
            shower: updateResidenceWcBathroomDto.shower,
            jacuzzi: updateResidenceWcBathroomDto.jacuzzi,
            bathtub: updateResidenceWcBathroomDto.bathtub,
            soap: updateResidenceWcBathroomDto.soap,
            shampoo: updateResidenceWcBathroomDto.shampoo,
            shared_wc_bathroom: updateResidenceWcBathroomDto.shared_wc_bathroom,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_wc_bathroom;
    } catch (e) {
      console.log(
        'Error in ResidenceWcBathroomService.update()',
        e.code,
        e.meta,
      );
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_wc_bathroom not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_wc_bathroom.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_wc_bathroom not found');
      }
    }
  }
}

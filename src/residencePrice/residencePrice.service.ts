import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidencePrice,
  FilterResidencePriceDto,
  CreateResidencePriceDto,
  UpdateResidencePriceDto,
} from './dto';

const select = {
  residence_id: true,
  weekday_price: true,
  weekend_price: true,
  peak_price: true,
  extra_guest_weekday: true,
  extra_guest_weekend: true,
  extra_guest_peak: true,
};

@Injectable()
export class ResidencePriceService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidencePriceDto: CreateResidencePriceDto,
  ): Promise<ResidencePrice> {
    try {
      const residence_price = await this.prisma.residence_price.create({
        select,
        data: createResidencePriceDto,
      });
      return residence_price;
    } catch (e) {
      console.log('Error in ResidencePriceService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidencePriceDto: FilterResidencePriceDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      weekday_price?: { gt?: number; lt?: number };
      weekend_price?: { gt?: number; lt?: number };
      peak_price?: { gt?: number; lt?: number };
      extra_guest_weekday?: { gt?: number; lt?: number };
      extra_guest_weekend?: { gt?: number; lt?: number };
      extra_guest_peak?: { gt?: number; lt?: number };
    } = {};
    if (filterResidencePriceDto.residence_id) {
      where.residence_id = parseInt(filterResidencePriceDto.residence_id);
    } else if (
      filterResidencePriceDto.min_weekday_price ||
      filterResidencePriceDto.max_weekday_price
    ) {
      where.weekday_price = {
        gt: filterResidencePriceDto.min_weekday_price
          ? parseInt(filterResidencePriceDto.min_weekday_price)
          : undefined,
        lt: filterResidencePriceDto.max_weekday_price
          ? parseInt(filterResidencePriceDto.max_weekday_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_weekend_price ||
      filterResidencePriceDto.max_weekend_price
    ) {
      where.weekend_price = {
        gt: filterResidencePriceDto.min_weekend_price
          ? parseInt(filterResidencePriceDto.min_weekend_price)
          : undefined,
        lt: filterResidencePriceDto.max_weekend_price
          ? parseInt(filterResidencePriceDto.max_weekend_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_peak_price ||
      filterResidencePriceDto.max_peak_price
    ) {
      where.peak_price = {
        gt: filterResidencePriceDto.min_peak_price
          ? parseInt(filterResidencePriceDto.min_peak_price)
          : undefined,
        lt: filterResidencePriceDto.max_peak_price
          ? parseInt(filterResidencePriceDto.max_peak_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_weekday ||
      filterResidencePriceDto.max_extra_guest_weekday
    ) {
      where.extra_guest_weekday = {
        gt: filterResidencePriceDto.min_extra_guest_weekday
          ? parseInt(filterResidencePriceDto.min_extra_guest_weekday)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_weekday
          ? parseInt(filterResidencePriceDto.max_extra_guest_weekday)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_weekend ||
      filterResidencePriceDto.max_extra_guest_weekend
    ) {
      where.extra_guest_weekend = {
        gt: filterResidencePriceDto.min_extra_guest_weekend
          ? parseInt(filterResidencePriceDto.min_extra_guest_weekend)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_weekend
          ? parseInt(filterResidencePriceDto.max_extra_guest_weekend)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_peak ||
      filterResidencePriceDto.max_extra_guest_peak
    ) {
      where.extra_guest_peak = {
        gt: filterResidencePriceDto.min_extra_guest_peak
          ? parseInt(filterResidencePriceDto.min_extra_guest_peak)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_peak
          ? parseInt(filterResidencePriceDto.max_extra_guest_peak)
          : undefined,
      };
    }

    const residence_prices = await this.prisma.residence_price.count({
      where,
    });
    return residence_prices;
  }

  async findAll(
    filterResidencePriceDto: FilterResidencePriceDto,
  ): Promise<ResidencePrice[]> {
    const where: {
      residence_id?: number;
      weekday_price?: { gt?: number; lt?: number };
      weekend_price?: { gt?: number; lt?: number };
      peak_price?: { gt?: number; lt?: number };
      extra_guest_weekday?: { gt?: number; lt?: number };
      extra_guest_weekend?: { gt?: number; lt?: number };
      extra_guest_peak?: { gt?: number; lt?: number };
    } = {};
    if (filterResidencePriceDto.residence_id) {
      where.residence_id = parseInt(filterResidencePriceDto.residence_id);
    } else if (
      filterResidencePriceDto.min_weekday_price ||
      filterResidencePriceDto.max_weekday_price
    ) {
      where.weekday_price = {
        gt: filterResidencePriceDto.min_weekday_price
          ? parseInt(filterResidencePriceDto.min_weekday_price)
          : undefined,
        lt: filterResidencePriceDto.max_weekday_price
          ? parseInt(filterResidencePriceDto.max_weekday_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_weekend_price ||
      filterResidencePriceDto.max_weekend_price
    ) {
      where.weekend_price = {
        gt: filterResidencePriceDto.min_weekend_price
          ? parseInt(filterResidencePriceDto.min_weekend_price)
          : undefined,
        lt: filterResidencePriceDto.max_weekend_price
          ? parseInt(filterResidencePriceDto.max_weekend_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_peak_price ||
      filterResidencePriceDto.max_peak_price
    ) {
      where.peak_price = {
        gt: filterResidencePriceDto.min_peak_price
          ? parseInt(filterResidencePriceDto.min_peak_price)
          : undefined,
        lt: filterResidencePriceDto.max_peak_price
          ? parseInt(filterResidencePriceDto.max_peak_price)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_weekday ||
      filterResidencePriceDto.max_extra_guest_weekday
    ) {
      where.extra_guest_weekday = {
        gt: filterResidencePriceDto.min_extra_guest_weekday
          ? parseInt(filterResidencePriceDto.min_extra_guest_weekday)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_weekday
          ? parseInt(filterResidencePriceDto.max_extra_guest_weekday)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_weekend ||
      filterResidencePriceDto.max_extra_guest_weekend
    ) {
      where.extra_guest_weekend = {
        gt: filterResidencePriceDto.min_extra_guest_weekend
          ? parseInt(filterResidencePriceDto.min_extra_guest_weekend)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_weekend
          ? parseInt(filterResidencePriceDto.max_extra_guest_weekend)
          : undefined,
      };
    } else if (
      filterResidencePriceDto.min_extra_guest_peak ||
      filterResidencePriceDto.max_extra_guest_peak
    ) {
      where.extra_guest_peak = {
        gt: filterResidencePriceDto.min_extra_guest_peak
          ? parseInt(filterResidencePriceDto.min_extra_guest_peak)
          : undefined,
        lt: filterResidencePriceDto.max_extra_guest_peak
          ? parseInt(filterResidencePriceDto.max_extra_guest_peak)
          : undefined,
      };
    }

    const orderBy = {};
    if (filterResidencePriceDto.sort) {
      filterResidencePriceDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_prices = await this.prisma.residence_price.findMany({
      select,
      where,
      skip: filterResidencePriceDto.offset
        ? parseInt(filterResidencePriceDto.offset)
        : undefined,
      take: filterResidencePriceDto.limit
        ? parseInt(filterResidencePriceDto.limit)
        : undefined,
      orderBy,
    });
    return residence_prices;
  }

  async findOne(id: number): Promise<ResidencePrice> {
    const residence_price = await this.prisma.residence_price.findUnique({
      select,
      where: { residence_id: id },
    });

    if (residence_price === null) {
      throw new BadRequestException('residence_price not found');
    }

    return residence_price;
  }

  async update(
    id: number,
    updateResidencePriceDto: UpdateResidencePriceDto,
  ): Promise<ResidencePrice> {
    try {
      const residence_price = await this.prisma.residence_price.update({
        select,
        data: {
          weekday_price: updateResidencePriceDto.weekday_price,
          weekend_price: updateResidencePriceDto.weekend_price,
          peak_price: updateResidencePriceDto.peak_price,
          extra_guest_weekday: updateResidencePriceDto.extra_guest_weekday,
          extra_guest_weekend: updateResidencePriceDto.extra_guest_weekend,
          extra_guest_peak: updateResidencePriceDto.extra_guest_peak,
        },
        where: {
          residence_id: id,
        },
      });
      return residence_price;
    } catch (e) {
      console.log('Error in ResidencePriceService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_price not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_price.delete({ where: { residence_id: id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_price not found');
      }
    }
  }
}

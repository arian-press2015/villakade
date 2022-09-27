import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceAirConditioning,
  FilterResidenceAirConditioningDto,
  CreateResidenceAirConditioningDto,
  UpdateResidenceAirConditioningDto,
} from './dto';

const select = {
  residence_id: true,
  radiator: true,
  wood_heater: true,
  fireplace: true,
  korsi: true,
  oil_heater: true,
  fancoil: true,
  electric_heater: true,
  air_conditioner: true,
  water_cooler: true,
  split: true,
  ceiling_fan: true,
  standing_fan: true,
};

@Injectable()
export class ResidenceAirConditioningService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceAirConditioningDto: CreateResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning> {
    try {
      const residence_air_conditioning_attribute =
        await this.prisma.residence_air_conditioning_attribute.create({
          select,
          data: createResidenceAirConditioningDto,
        });
      return residence_air_conditioning_attribute;
    } catch (e) {
      console.log(
        'Error in ResidenceAirConditioningService.create()',
        e.code,
        e.meta,
      );
      throw e;
    }
  }

  async getCount(
    filterResidenceAirConditioningDto: FilterResidenceAirConditioningDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      radiator?: boolean;
      wood_heater?: boolean;
      fireplace?: boolean;
      korsi?: boolean;
      oil_heater?: boolean;
      fancoil?: boolean;
      electric_heater?: boolean;
      air_conditioner?: boolean;
      water_cooler?: boolean;
    } = {};
    if (filterResidenceAirConditioningDto.residence_id) {
      where.residence_id = parseInt(
        filterResidenceAirConditioningDto.residence_id,
      );
    } else if (filterResidenceAirConditioningDto.radiator) {
      where.radiator = filterResidenceAirConditioningDto.radiator === 'true';
    } else if (filterResidenceAirConditioningDto.wood_heater) {
      where.wood_heater =
        filterResidenceAirConditioningDto.wood_heater === 'true';
    } else if (filterResidenceAirConditioningDto.fireplace) {
      where.fireplace = filterResidenceAirConditioningDto.fireplace === 'true';
    } else if (filterResidenceAirConditioningDto.korsi) {
      where.korsi = filterResidenceAirConditioningDto.korsi === 'true';
    } else if (filterResidenceAirConditioningDto.oil_heater) {
      where.oil_heater =
        filterResidenceAirConditioningDto.oil_heater === 'true';
    } else if (filterResidenceAirConditioningDto.fancoil) {
      where.fancoil = filterResidenceAirConditioningDto.fancoil === 'true';
    } else if (filterResidenceAirConditioningDto.electric_heater) {
      where.electric_heater =
        filterResidenceAirConditioningDto.electric_heater === 'true';
    } else if (filterResidenceAirConditioningDto.air_conditioner) {
      where.air_conditioner =
        filterResidenceAirConditioningDto.air_conditioner === 'true';
    } else if (filterResidenceAirConditioningDto.water_cooler) {
      where.water_cooler =
        filterResidenceAirConditioningDto.water_cooler === 'true';
    }

    const residence_air_conditioning_attributes =
      await this.prisma.residence_air_conditioning_attribute.count({
        where,
      });
    return residence_air_conditioning_attributes;
  }

  async findAll(
    filterResidenceAirConditioningDto: FilterResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning[]> {
    const where: {
      residence_id?: number;
      radiator?: boolean;
      wood_heater?: boolean;
      fireplace?: boolean;
      korsi?: boolean;
      oil_heater?: boolean;
      fancoil?: boolean;
      electric_heater?: boolean;
      air_conditioner?: boolean;
      water_cooler?: boolean;
    } = {};
    if (filterResidenceAirConditioningDto.residence_id) {
      where.residence_id = parseInt(
        filterResidenceAirConditioningDto.residence_id,
      );
    } else if (filterResidenceAirConditioningDto.radiator) {
      where.radiator = filterResidenceAirConditioningDto.radiator === 'true';
    } else if (filterResidenceAirConditioningDto.wood_heater) {
      where.wood_heater =
        filterResidenceAirConditioningDto.wood_heater === 'true';
    } else if (filterResidenceAirConditioningDto.fireplace) {
      where.fireplace = filterResidenceAirConditioningDto.fireplace === 'true';
    } else if (filterResidenceAirConditioningDto.korsi) {
      where.korsi = filterResidenceAirConditioningDto.korsi === 'true';
    } else if (filterResidenceAirConditioningDto.oil_heater) {
      where.oil_heater =
        filterResidenceAirConditioningDto.oil_heater === 'true';
    } else if (filterResidenceAirConditioningDto.fancoil) {
      where.fancoil = filterResidenceAirConditioningDto.fancoil === 'true';
    } else if (filterResidenceAirConditioningDto.electric_heater) {
      where.electric_heater =
        filterResidenceAirConditioningDto.electric_heater === 'true';
    } else if (filterResidenceAirConditioningDto.air_conditioner) {
      where.air_conditioner =
        filterResidenceAirConditioningDto.air_conditioner === 'true';
    } else if (filterResidenceAirConditioningDto.water_cooler) {
      where.water_cooler =
        filterResidenceAirConditioningDto.water_cooler === 'true';
    }

    const orderBy = {};
    if (filterResidenceAirConditioningDto.sort) {
      filterResidenceAirConditioningDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_air_conditioning_attributes =
      await this.prisma.residence_air_conditioning_attribute.findMany({
        select,
        where,
        skip: filterResidenceAirConditioningDto.offset
          ? parseInt(filterResidenceAirConditioningDto.offset)
          : undefined,
        take: filterResidenceAirConditioningDto.limit
          ? parseInt(filterResidenceAirConditioningDto.limit)
          : undefined,
        orderBy,
      });
    return residence_air_conditioning_attributes;
  }

  async findOne(id: number): Promise<ResidenceAirConditioning> {
    const residence_air_conditioning_attribute =
      await this.prisma.residence_air_conditioning_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_air_conditioning_attribute === null) {
      throw new BadRequestException(
        'residence_air_conditioning_attribute not found',
      );
    }

    return residence_air_conditioning_attribute;
  }

  async update(
    id: number,
    updateResidenceAirConditioningDto: UpdateResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning> {
    try {
      const residence_air_conditioning_attribute =
        await this.prisma.residence_air_conditioning_attribute.update({
          select,
          data: {
            radiator: updateResidenceAirConditioningDto.radiator,
            wood_heater: updateResidenceAirConditioningDto.wood_heater,
            fireplace: updateResidenceAirConditioningDto.fireplace,
            korsi: updateResidenceAirConditioningDto.korsi,
            oil_heater: updateResidenceAirConditioningDto.oil_heater,
            fancoil: updateResidenceAirConditioningDto.fancoil,
            electric_heater: updateResidenceAirConditioningDto.electric_heater,
            air_conditioner: updateResidenceAirConditioningDto.air_conditioner,
            water_cooler: updateResidenceAirConditioningDto.water_cooler,
            split: updateResidenceAirConditioningDto.water_cooler,
            ceiling_fan: updateResidenceAirConditioningDto.ceiling_fan,
            standing_fan: updateResidenceAirConditioningDto.standing_fan,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_air_conditioning_attribute;
    } catch (e) {
      console.log(
        'Error in ResidenceAirConditioningService.update()',
        e.code,
        e.meta,
      );
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException(
          'residence_air_conditioning_attribute not found',
        );
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_air_conditioning_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException(
          'residence_air_conditioning_attribute not found',
        );
      }
    }
  }
}

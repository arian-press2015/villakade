import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ResidenceFacility,
  FilterResidenceFacilityDto,
  CreateResidenceFacilityDto,
  UpdateResidenceFacilityDto,
} from './dto';

const select = {
  residence_id: true,
  furniture: true,
  vacuum_cleaner: true,
  washing_machine: true,
  washing_powder: true,
  dishwashing_machine: true,
  wifi: true,
  hairdryer: true,
  elevator: true,
  iron: true,
  telephone: true,
  first_aid_kit: true,
  security_camera: true,
};

@Injectable()
export class ResidenceFacilityService {
  constructor(private prisma: PrismaService) {}
  async create(
    createResidenceFacilityDto: CreateResidenceFacilityDto,
  ): Promise<ResidenceFacility> {
    try {
      const residence_facility_attribute =
        await this.prisma.residence_facility_attribute.create({
          select,
          data: createResidenceFacilityDto,
        });
      return residence_facility_attribute;
    } catch (e) {
      console.log('Error in ResidenceFacilityService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(
    filterResidenceFacilityDto: FilterResidenceFacilityDto,
  ): Promise<number> {
    const where: {
      residence_id?: number;
      furniture?: boolean;
      vacuum_cleaner?: boolean;
      washing_machine?: boolean;
      washing_powder?: boolean;
      dishwashing_machine?: boolean;
      wifi?: boolean;
      hairdryer?: boolean;
      elevator?: boolean;
      iron?: boolean;
      telephone?: boolean;
      first_aid_kit?: boolean;
      security_camera?: boolean;
    } = {};
    if (filterResidenceFacilityDto.residence_id) {
      where.residence_id = parseInt(filterResidenceFacilityDto.residence_id);
    } else if (filterResidenceFacilityDto.furniture) {
      where.furniture = filterResidenceFacilityDto.furniture === 'true';
    } else if (filterResidenceFacilityDto.vacuum_cleaner) {
      where.vacuum_cleaner =
        filterResidenceFacilityDto.vacuum_cleaner === 'true';
    } else if (filterResidenceFacilityDto.washing_machine) {
      where.washing_machine =
        filterResidenceFacilityDto.washing_machine === 'true';
    } else if (filterResidenceFacilityDto.washing_powder) {
      where.washing_powder =
        filterResidenceFacilityDto.washing_powder === 'true';
    } else if (filterResidenceFacilityDto.dishwashing_machine) {
      where.dishwashing_machine =
        filterResidenceFacilityDto.dishwashing_machine === 'true';
    } else if (filterResidenceFacilityDto.wifi) {
      where.wifi = filterResidenceFacilityDto.wifi === 'true';
    } else if (filterResidenceFacilityDto.hairdryer) {
      where.hairdryer = filterResidenceFacilityDto.hairdryer === 'true';
    } else if (filterResidenceFacilityDto.elevator) {
      where.elevator = filterResidenceFacilityDto.elevator === 'true';
    } else if (filterResidenceFacilityDto.iron) {
      where.iron = filterResidenceFacilityDto.iron === 'true';
    } else if (filterResidenceFacilityDto.telephone) {
      where.telephone = filterResidenceFacilityDto.telephone === 'true';
    } else if (filterResidenceFacilityDto.first_aid_kit) {
      where.first_aid_kit = filterResidenceFacilityDto.first_aid_kit === 'true';
    } else if (filterResidenceFacilityDto.security_camera) {
      where.security_camera =
        filterResidenceFacilityDto.security_camera === 'true';
    }

    const residence_facility_attributes =
      await this.prisma.residence_facility_attribute.count({
        where,
      });
    return residence_facility_attributes;
  }

  async findAll(
    filterResidenceFacilityDto: FilterResidenceFacilityDto,
  ): Promise<ResidenceFacility[]> {
    const where: {
      residence_id?: number;
      furniture?: boolean;
      vacuum_cleaner?: boolean;
      washing_machine?: boolean;
      washing_powder?: boolean;
      dishwashing_machine?: boolean;
      wifi?: boolean;
      hairdryer?: boolean;
      elevator?: boolean;
      iron?: boolean;
      telephone?: boolean;
      first_aid_kit?: boolean;
      security_camera?: boolean;
    } = {};
    if (filterResidenceFacilityDto.residence_id) {
      where.residence_id = parseInt(filterResidenceFacilityDto.residence_id);
    } else if (filterResidenceFacilityDto.furniture) {
      where.furniture = filterResidenceFacilityDto.furniture === 'true';
    } else if (filterResidenceFacilityDto.vacuum_cleaner) {
      where.vacuum_cleaner =
        filterResidenceFacilityDto.vacuum_cleaner === 'true';
    } else if (filterResidenceFacilityDto.washing_machine) {
      where.washing_machine =
        filterResidenceFacilityDto.washing_machine === 'true';
    } else if (filterResidenceFacilityDto.washing_powder) {
      where.washing_powder =
        filterResidenceFacilityDto.washing_powder === 'true';
    } else if (filterResidenceFacilityDto.dishwashing_machine) {
      where.dishwashing_machine =
        filterResidenceFacilityDto.dishwashing_machine === 'true';
    } else if (filterResidenceFacilityDto.wifi) {
      where.wifi = filterResidenceFacilityDto.wifi === 'true';
    } else if (filterResidenceFacilityDto.hairdryer) {
      where.hairdryer = filterResidenceFacilityDto.hairdryer === 'true';
    } else if (filterResidenceFacilityDto.elevator) {
      where.elevator = filterResidenceFacilityDto.elevator === 'true';
    } else if (filterResidenceFacilityDto.iron) {
      where.iron = filterResidenceFacilityDto.iron === 'true';
    } else if (filterResidenceFacilityDto.telephone) {
      where.telephone = filterResidenceFacilityDto.telephone === 'true';
    } else if (filterResidenceFacilityDto.first_aid_kit) {
      where.first_aid_kit = filterResidenceFacilityDto.first_aid_kit === 'true';
    } else if (filterResidenceFacilityDto.security_camera) {
      where.security_camera =
        filterResidenceFacilityDto.security_camera === 'true';
    }

    const orderBy = {};
    if (filterResidenceFacilityDto.sort) {
      filterResidenceFacilityDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const residence_facility_attributes =
      await this.prisma.residence_facility_attribute.findMany({
        select,
        where,
        skip: filterResidenceFacilityDto.offset
          ? parseInt(filterResidenceFacilityDto.offset)
          : undefined,
        take: filterResidenceFacilityDto.limit
          ? parseInt(filterResidenceFacilityDto.limit)
          : undefined,
        orderBy,
      });
    return residence_facility_attributes;
  }

  async findOne(id: number): Promise<ResidenceFacility> {
    const residence_facility_attribute =
      await this.prisma.residence_facility_attribute.findUnique({
        select,
        where: { residence_id: id },
      });

    if (residence_facility_attribute === null) {
      throw new BadRequestException('residence_facility_attribute not found');
    }

    return residence_facility_attribute;
  }

  async update(
    id: number,
    updateResidenceFacilityDto: UpdateResidenceFacilityDto,
  ): Promise<ResidenceFacility> {
    try {
      const residence_facility_attribute =
        await this.prisma.residence_facility_attribute.update({
          select,
          data: {
            furniture: updateResidenceFacilityDto.furniture,
            vacuum_cleaner: updateResidenceFacilityDto.vacuum_cleaner,
            washing_machine: updateResidenceFacilityDto.washing_machine,
            washing_powder: updateResidenceFacilityDto.washing_powder,
            dishwashing_machine: updateResidenceFacilityDto.dishwashing_machine,
            wifi: updateResidenceFacilityDto.wifi,
            hairdryer: updateResidenceFacilityDto.hairdryer,
            elevator: updateResidenceFacilityDto.elevator,
            iron: updateResidenceFacilityDto.iron,
            telephone: updateResidenceFacilityDto.iron,
            first_aid_kit: updateResidenceFacilityDto.first_aid_kit,
            security_camera: updateResidenceFacilityDto.security_camera,
          },
          where: {
            residence_id: id,
          },
        });
      return residence_facility_attribute;
    } catch (e) {
      console.log('Error in ResidenceFacilityService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('residence_facility_attribute not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.residence_facility_attribute.delete({
        where: { residence_id: id },
      });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('residence_facility_attribute not found');
      }
    }
  }
}

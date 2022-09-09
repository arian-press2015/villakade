import { Injectable } from '@nestjs/common';
import {
  ResidenceAttribute,
  FilterResidenceAttributeDto,
  CreateResidenceAttributeDto,
  UpdateResidenceAttributeDto,
} from './dto';

@Injectable()
export class ResidenceAttributeService {
  async create(
    createResidenceAttributeDto: CreateResidenceAttributeDto,
  ): Promise<ResidenceAttribute> {
    const residenceAttribute = {
      residence_id: createResidenceAttributeDto.residence_id,
      residence_size: createResidenceAttributeDto.residence_size,
      residence_yard_size: createResidenceAttributeDto.residence_yard_size,
      bedroom_count: createResidenceAttributeDto.bedroom_count,
      capacity: createResidenceAttributeDto.capacity,
      in_time: createResidenceAttributeDto.in_time,
      out_time: createResidenceAttributeDto.out_time,
      pet: createResidenceAttributeDto.pet,
      instant_delivery: createResidenceAttributeDto.instant_delivery,
      dishes: createResidenceAttributeDto.dishes,
      dining_table: createResidenceAttributeDto.dining_table,
      microwave: createResidenceAttributeDto.microwave,
      fridge: createResidenceAttributeDto.fridge,
      water: createResidenceAttributeDto.water,
      electricity: createResidenceAttributeDto.electricity,
      gas: createResidenceAttributeDto.gas,
      tv: createResidenceAttributeDto.tv,
      elevator: createResidenceAttributeDto.elevator,
      local_wc: createResidenceAttributeDto.local_wc,
      wc: createResidenceAttributeDto.wc,
      pool_table: createResidenceAttributeDto.pool_table,
      ping_pong_table: createResidenceAttributeDto.ping_pong_table,
      pool: createResidenceAttributeDto.pool,
      vip: createResidenceAttributeDto.vip,
    };
    return residenceAttribute;
  }

  async getCount(
    filterResidenceAttributeDto: FilterResidenceAttributeDto,
  ): Promise<number> {
    return 1;
  }

  async findAll(
    filterResidenceAttributeDto: FilterResidenceAttributeDto,
  ): Promise<ResidenceAttribute[]> {
    const residenceAttribute = [
      {
        residence_id: 1,
        residence_size: 60,
        residence_yard_size: 30,
        bedroom_count: 3,
        capacity: 4,
        in_time: '14:00:00',
        out_time: '10:00:00',
        pet: true,
        instant_delivery: true,
        dishes: true,
        dining_table: true,
        microwave: true,
        fridge: true,
        water: true,
        electricity: true,
        gas: true,
        tv: true,
        elevator: true,
        local_wc: true,
        wc: true,
        pool_table: true,
        ping_pong_table: true,
        pool: true,
        vip: true,
      },
    ];
    return residenceAttribute;
  }

  async findOne(id: number): Promise<ResidenceAttribute> {
    const residenceAttribute = {
      residence_id: id,
      residence_size: 60,
      residence_yard_size: 30,
      bedroom_count: 3,
      capacity: 4,
      in_time: '14:00:00',
      out_time: '10:00:00',
      pet: true,
      instant_delivery: true,
      dishes: true,
      dining_table: true,
      microwave: true,
      fridge: true,
      water: true,
      electricity: true,
      gas: true,
      tv: true,
      elevator: true,
      local_wc: true,
      wc: true,
      pool_table: true,
      ping_pong_table: true,
      pool: true,
      vip: true,
    };
    return residenceAttribute;
  }

  async update(
    id: number,
    updateResidenceAttributeDto: UpdateResidenceAttributeDto,
  ): Promise<ResidenceAttribute> {
    const residenceAttribute = {
      residence_id: id,
      residence_size: updateResidenceAttributeDto.residence_size || 60,
      residence_yard_size:
        updateResidenceAttributeDto.residence_yard_size || 30,
      bedroom_count: updateResidenceAttributeDto.bedroom_count || 3,
      capacity: updateResidenceAttributeDto.capacity || 4,
      in_time: updateResidenceAttributeDto.in_time || '14:00:00',
      out_time: updateResidenceAttributeDto.out_time || '10:00:00',
      pet: updateResidenceAttributeDto.pet || true,
      instant_delivery: updateResidenceAttributeDto.instant_delivery || true,
      dishes: updateResidenceAttributeDto.dishes || true,
      dining_table: updateResidenceAttributeDto.dining_table || true,
      microwave: updateResidenceAttributeDto.microwave || true,
      fridge: updateResidenceAttributeDto.fridge || true,
      water: updateResidenceAttributeDto.water || true,
      electricity: updateResidenceAttributeDto.electricity || true,
      gas: updateResidenceAttributeDto.gas || true,
      tv: updateResidenceAttributeDto.tv || true,
      elevator: updateResidenceAttributeDto.elevator || true,
      local_wc: updateResidenceAttributeDto.local_wc || true,
      wc: updateResidenceAttributeDto.wc || true,
      pool_table: updateResidenceAttributeDto.pool_table || true,
      ping_pong_table: updateResidenceAttributeDto.ping_pong_table || true,
      pool: updateResidenceAttributeDto.pool || true,
      vip: updateResidenceAttributeDto.vip || true,
    };
    return residenceAttribute;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import { ResidenceAttribute } from './dto';

const select = {
  residence_air_conditioning_attribute: {
    select: {
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
    },
  },
  residence_cooking_attribute: {
    select: {
      residence_id: true,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: true,
      lighter: true,
    },
  },
  residence_entertainment_attribute: {
    select: {
      residence_id: true,
      television: true,
      receiver: true,
      audio_system: true,
      swing: true,
      ping_pong: true,
      foosball: true,
      game_console: true,
      pool_table: true,
      game_board: true,
      treadmill: true,
      bicycle: true,
      beach_motor: true,
    },
  },
  residence_facility_attribute: {
    select: {
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
    },
  },
  residence_parking_attribute: {
    select: {
      residence_id: true,
      roof: true,
      unroofed: true,
      public: true,
      free_space: true,
      capacity: true,
    },
  },
  residence_room_attribute: {
    select: {
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
    },
  },
  residence_rule: {
    select: {
      residence_id: true,
      rule_body: true,
      in_time: true,
      out_time: true,
      required_documents: true,
      pet_status: true,
      ceremonies: true,
    },
  },
  residence_serve_attribute: {
    select: {
      residence_id: true,
      plate: true,
      fork_spoon: true,
      knife: true,
      bowl: true,
      glass: true,
      teapot: true,
      kettle: true,
      samovar: true,
      tea_maker: true,
      salt_shaker: true,
      tablecloth: true,
      dining_table: true,
      child_chair: true,
      tissue_paper: true,
    },
  },
  residence_wc_bathroom: {
    select: {
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
    },
  },
};

@Injectable()
export class ResidenceAttributeService {
  constructor(private prisma: PrismaService) {}
  async findOne(id: number): Promise<ResidenceAttribute> {
    const residenceAttribute = await this.prisma.residence.findUnique({
      select,
      where: { id },
    });
    return residenceAttribute;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { ResidenceAirConditioning } from '../../residenceAirConditioning/dto';
import { ResidenceCooking } from '../../residenceCooking/dto';
import { ResidenceEntertainment } from '../../residenceEntertainment/dto';
import { ResidenceFacility } from '../../residenceFacility/dto';
import { ResidenceParking } from '../../residenceParking/dto';
import { ResidenceRoom } from '../../residenceRoom/dto';
import { ResidenceRule } from '../../residenceRule/dto';
import { ResidenceServe } from '../../residenceServe/dto';
import { ResidenceWcBathroom } from '../../residenceWcBathroom/dto';

export class ResidenceAttribute {
  @ApiProperty({
    example: {
      residence_id: 2,
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
    description: 'residence_air_conditioning of the ResidenceAttribute',
  })
  readonly residence_air_conditioning_attribute: ResidenceAirConditioning;

  @ApiProperty({
    example: {
      residence_id: 2,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: true,
      lighter: true,
    },
    description: 'residence_cooking of the ResidenceAttribute',
  })
  readonly residence_cooking_attribute: ResidenceCooking;

  @ApiProperty({
    example: {
      residence_id: 2,
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
    description: 'residence_entertainment of the ResidenceAttribute',
  })
  readonly residence_entertainment_attribute: ResidenceEntertainment;

  @ApiProperty({
    example: {
      residence_id: 2,
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
    description: 'residence_facility of the ResidenceAttribute',
  })
  readonly residence_facility_attribute: ResidenceFacility;

  @ApiProperty({
    example: {
      residence_id: 2,
      roof: true,
      unroofed: true,
      public: true,
      free_space: true,
      capacity: 3,
    },
    description: 'residence_parking of the ResidenceAttribute',
  })
  readonly residence_parking_attribute: ResidenceParking;

  @ApiProperty({
    example: {
      residence_id: 2,
      count: 2,
      wall_closet: true,
      drawer: true,
      hanger: true,
      double_bed: true,
      single_bed: true,
      carpet: true,
      heating_system: true,
      cooling_system: true,
    },
    description: 'residence_room of the ResidenceAttribute',
  })
  readonly residence_room_attribute: ResidenceRoom;

  @ApiProperty({
    example: {
      residence_id: 3,
      rule_body: 'rule',
      in_time: '10:20:30',
      out_time: '14:20:30',
      required_documents: 'nothing',
      pet_status: 'allowed',
      ceremonies: 'allowed',
    },
    description: 'residence_rule of the ResidenceAttribute',
  })
  readonly residence_rule: ResidenceRule;

  @ApiProperty({
    example: {
      residence_id: 2,
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
    description: 'residence_serve of the ResidenceAttribute',
  })
  readonly residence_serve_attribute: ResidenceServe;

  @ApiProperty({
    example: {
      residence_id: 3,
      location: 'here',
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
    description: 'residence_wc_bathroom status of the ResidenceAttribute',
  })
  readonly residence_wc_bathroom: ResidenceWcBathroom;
}

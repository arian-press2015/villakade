import { ApiProperty } from '@nestjs/swagger';

export class ResidenceAirConditioning {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceAirConditioning',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'radiator of the ResidenceAirConditioning',
  })
  readonly radiator: boolean;

  @ApiProperty({
    example: true,
    description: 'wood_heater of the ResidenceAirConditioning',
  })
  readonly wood_heater: boolean;

  @ApiProperty({
    example: true,
    description: 'fireplace of the ResidenceAirConditioning',
  })
  readonly fireplace: boolean;

  @ApiProperty({
    example: true,
    description: 'korsi of the ResidenceAirConditioning',
  })
  readonly korsi: boolean;

  @ApiProperty({
    example: true,
    description: 'oil_heater of the ResidenceAirConditioning',
  })
  readonly oil_heater: boolean;

  @ApiProperty({
    example: true,
    description: 'fancoil of the ResidenceAirConditioning',
  })
  readonly fancoil: boolean;

  @ApiProperty({
    example: true,
    description: 'electric_heater of the ResidenceAirConditioning',
  })
  readonly electric_heater: boolean;

  @ApiProperty({
    example: true,
    description: 'air_conditioner of the ResidenceAirConditioning',
  })
  readonly air_conditioner: boolean;

  @ApiProperty({
    example: true,
    description: 'water_cooler of the ResidenceAirConditioning',
  })
  readonly water_cooler: boolean;

  @ApiProperty({
    example: true,
    description: 'split of the ResidenceAirConditioning',
  })
  readonly split: boolean;

  @ApiProperty({
    example: true,
    description: 'ceiling_fan of the ResidenceAirConditioning',
  })
  readonly ceiling_fan: boolean;

  @ApiProperty({
    example: true,
    description: 'standing_fan of the ResidenceAirConditioning',
  })
  readonly standing_fan: boolean;
}

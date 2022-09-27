import { ApiProperty } from '@nestjs/swagger';

export class ResidenceRoom {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceRoom',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 2,
    description: 'count of the ResidenceRoom',
  })
  readonly count: number;

  @ApiProperty({
    example: true,
    description: 'wall_closet of the ResidenceRoom',
  })
  readonly wall_closet: boolean;

  @ApiProperty({
    example: true,
    description: 'drawer of the ResidenceRoom',
  })
  readonly drawer: boolean;

  @ApiProperty({
    example: true,
    description: 'hanger of the ResidenceRoom',
  })
  readonly hanger: boolean;

  @ApiProperty({
    example: true,
    description: 'double_bed of the ResidenceRoom',
  })
  readonly double_bed: boolean;

  @ApiProperty({
    example: true,
    description: 'single_bed of the ResidenceRoom',
  })
  readonly single_bed: boolean;

  @ApiProperty({
    example: true,
    description: 'carpet of the ResidenceRoom',
  })
  readonly carpet: boolean;

  @ApiProperty({
    example: true,
    description: 'heating_system of the ResidenceRoom',
  })
  readonly heating_system: boolean;

  @ApiProperty({
    example: true,
    description: 'cooling_system of the ResidenceRoom',
  })
  readonly cooling_system: boolean;
}

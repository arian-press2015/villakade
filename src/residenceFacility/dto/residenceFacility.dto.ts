import { ApiProperty } from '@nestjs/swagger';

export class ResidenceFacility {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceFacility',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'furniture of the ResidenceFacility',
  })
  readonly furniture: boolean;

  @ApiProperty({
    example: true,
    description: 'vacuum_cleaner of the ResidenceFacility',
  })
  readonly vacuum_cleaner: boolean;

  @ApiProperty({
    example: true,
    description: 'washing_machine of the ResidenceFacility',
  })
  readonly washing_machine: boolean;

  @ApiProperty({
    example: true,
    description: 'washing_powder of the ResidenceFacility',
  })
  readonly washing_powder: boolean;

  @ApiProperty({
    example: true,
    description: 'dishwashing_machine of the ResidenceFacility',
  })
  readonly dishwashing_machine: boolean;

  @ApiProperty({
    example: true,
    description: 'wifi of the ResidenceFacility',
  })
  readonly wifi: boolean;

  @ApiProperty({
    example: true,
    description: 'hairdryer of the ResidenceFacility',
  })
  readonly hairdryer: boolean;

  @ApiProperty({
    example: true,
    description: 'elevator of the ResidenceFacility',
  })
  readonly elevator: boolean;

  @ApiProperty({
    example: true,
    description: 'iron of the ResidenceFacility',
  })
  readonly iron: boolean;

  @ApiProperty({
    example: true,
    description: 'telephone of the ResidenceFacility',
  })
  readonly telephone: boolean;

  @ApiProperty({
    example: true,
    description: 'first_aid_kit of the ResidenceFacility',
  })
  readonly first_aid_kit: boolean;

  @ApiProperty({
    example: true,
    description: 'security_camera of the ResidenceFacility',
  })
  readonly security_camera: boolean;
}

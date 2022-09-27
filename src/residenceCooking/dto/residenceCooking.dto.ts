import { ApiProperty } from '@nestjs/swagger';

export class ResidenceCooking {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceCooking',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'fridge of the ResidenceCooking',
  })
  readonly fridge: boolean;

  @ApiProperty({
    example: true,
    description: 'microwave of the ResidenceCooking',
  })
  readonly microwave: boolean;

  @ApiProperty({
    example: true,
    description: 'pan of the ResidenceCooking',
  })
  readonly pan: boolean;

  @ApiProperty({
    example: true,
    description: 'pot of the ResidenceCooking',
  })
  readonly pot: boolean;

  @ApiProperty({
    example: true,
    description: 'grill of the ResidenceCooking',
  })
  readonly grill: boolean;

  @ApiProperty({
    example: true,
    description: 'skewer of the ResidenceCooking',
  })
  readonly skewer: boolean;

  @ApiProperty({
    example: true,
    description: 'oven of the ResidenceCooking',
  })
  readonly oven: boolean;

  @ApiProperty({
    example: true,
    description: 'lighter of the ResidenceCooking',
  })
  readonly lighter: boolean;
}

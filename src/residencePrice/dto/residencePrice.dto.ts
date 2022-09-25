import { ApiProperty } from '@nestjs/swagger';

export class ResidencePrice {
  @ApiProperty({
    example: 123,
    description: 'residence_id of the residence_price',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 4,
    description: 'weekday_price of the residence_price',
  })
  readonly weekday_price: number;

  @ApiProperty({
    example: 4,
    description: 'weekend_price of the residence_price',
  })
  readonly weekend_price: number;

  @ApiProperty({
    example: 4,
    description: 'peak_price of the residence_price',
  })
  readonly peak_price: number;

  @ApiProperty({
    example: 4,
    description: 'extra_guest_weekday of the residence_price',
  })
  readonly extra_guest_weekday: number;

  @ApiProperty({
    example: 4,
    description: 'extra_guest_weekend of the residence_price',
  })
  readonly extra_guest_weekend: number;

  @ApiProperty({
    example: 4,
    description: 'extra_guest_peak of the residence_price',
  })
  readonly extra_guest_peak: number;
}

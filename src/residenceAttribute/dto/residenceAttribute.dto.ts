import { ApiProperty } from '@nestjs/swagger';

export class ResidenceAttribute {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceAttribute',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 60,
    description: 'residence_size of the ResidenceAttribute',
  })
  readonly residence_size: number;

  @ApiProperty({
    example: 30,
    description: 'residence_yard_size of the ResidenceAttribute',
  })
  readonly residence_yard_size: number;

  @ApiProperty({
    example: 2,
    description: 'bedroom_count of the ResidenceAttribute',
  })
  readonly bedroom_count: number;

  @ApiProperty({
    example: 3,
    description: 'capacity of the ResidenceAttribute',
  })
  readonly capacity: number;

  @ApiProperty({
    example: '14:00:00',
    description: 'in_time of the ResidenceAttribute',
  })
  readonly in_time: string;

  @ApiProperty({
    example: '10:00:00',
    description: 'capacity of the ResidenceAttribute',
  })
  readonly out_time: string;

  @ApiProperty({
    example: false,
    description: 'pet status of the ResidenceAttribute',
  })
  readonly pet: boolean;

  @ApiProperty({
    example: false,
    description: 'instant_delivery status of the ResidenceAttribute',
  })
  readonly instant_delivery: boolean;

  @ApiProperty({
    example: false,
    description: 'dishes status of the ResidenceAttribute',
  })
  readonly dishes: boolean;

  @ApiProperty({
    example: false,
    description: 'dining_table status of the ResidenceAttribute',
  })
  readonly dining_table: boolean;

  @ApiProperty({
    example: false,
    description: 'microwave status of the ResidenceAttribute',
  })
  readonly microwave: boolean;

  @ApiProperty({
    example: false,
    description: 'fridge status of the ResidenceAttribute',
  })
  readonly fridge: boolean;

  @ApiProperty({
    example: false,
    description: 'water status of the ResidenceAttribute',
  })
  readonly water: boolean;

  @ApiProperty({
    example: false,
    description: 'electricity status of the ResidenceAttribute',
  })
  readonly electricity: boolean;

  @ApiProperty({
    example: false,
    description: 'gas status of the ResidenceAttribute',
  })
  readonly gas: boolean;

  @ApiProperty({
    example: false,
    description: 'tv status of the ResidenceAttribute',
  })
  readonly tv: boolean;

  @ApiProperty({
    example: false,
    description: 'elevator status of the ResidenceAttribute',
  })
  readonly elevator: boolean;

  @ApiProperty({
    example: false,
    description: 'local_wc status of the ResidenceAttribute',
  })
  readonly local_wc: boolean;

  @ApiProperty({
    example: false,
    description: 'wc status of the ResidenceAttribute',
  })
  readonly wc: boolean;

  @ApiProperty({
    example: false,
    description: 'pool_table status of the ResidenceAttribute',
  })
  readonly pool_table: boolean;

  @ApiProperty({
    example: false,
    description: 'ping_pong_table status of the ResidenceAttribute',
  })
  readonly ping_pong_table: boolean;

  @ApiProperty({
    example: false,
    description: 'pool status of the ResidenceAttribute',
  })
  readonly pool: boolean;

  @ApiProperty({
    example: false,
    description: 'vip status of the ResidenceAttribute',
  })
  readonly vip: boolean;
}

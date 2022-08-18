import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsPositive, IsString } from 'class-validator';

export class CreateResidenceAttributeDto {
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceAttribute',
  })
  readonly residence_id: number;

  @IsPositive({ message: 'residence_size must be a positive number' })
  @ApiProperty({
    example: 60,
    description: 'residence_size of the ResidenceAttribute',
  })
  readonly residence_size: number;

  @IsPositive({ message: 'residence_yard_size must be a positive number' })
  @ApiProperty({
    example: 30,
    description: 'residence_yard_size of the ResidenceAttribute',
  })
  readonly residence_yard_size: number;

  @IsPositive({ message: 'bedroom_count must be a positive number' })
  @ApiProperty({
    example: 2,
    description: 'bedroom_count of the ResidenceAttribute',
  })
  readonly bedroom_count: number;

  @IsPositive({ message: 'capacity must be a positive number' })
  @ApiProperty({
    example: 3,
    description: 'capacity of the ResidenceAttribute',
  })
  readonly capacity: number;

  @IsString({ message: 'in_time must be a string' })
  @ApiProperty({
    example: '14:00:00',
    description: 'in_time of the ResidenceAttribute',
  })
  readonly in_time: string;

  @IsString({ message: 'out_time must be a string' })
  @ApiProperty({
    example: '10:00:00',
    description: 'capacity of the ResidenceAttribute',
  })
  readonly out_time: string;

  @IsBoolean({ message: 'pet must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'pet status of the ResidenceAttribute',
  })
  readonly pet: boolean;

  @IsBoolean({ message: 'instant_delivery must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'instant_delivery status of the ResidenceAttribute',
  })
  readonly instant_delivery: boolean;

  @IsBoolean({ message: 'dishes must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'dishes status of the ResidenceAttribute',
  })
  readonly dishes: boolean;

  @IsBoolean({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'dining_table status of the ResidenceAttribute',
  })
  readonly dining_table: boolean;

  @IsBoolean({ message: 'microwave must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'microwave status of the ResidenceAttribute',
  })
  readonly microwave: boolean;

  @IsBoolean({ message: 'fridge must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'fridge status of the ResidenceAttribute',
  })
  readonly fridge: boolean;

  @IsBoolean({ message: 'water must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'water status of the ResidenceAttribute',
  })
  readonly water: boolean;

  @IsBoolean({ message: 'electricity must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'electricity status of the ResidenceAttribute',
  })
  readonly electricity: boolean;

  @IsBoolean({ message: 'gas must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'gas status of the ResidenceAttribute',
  })
  readonly gas: boolean;

  @IsBoolean({ message: 'tv must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'tv status of the ResidenceAttribute',
  })
  readonly tv: boolean;

  @IsBoolean({ message: 'elevator must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'elevator status of the ResidenceAttribute',
  })
  readonly elevator: boolean;

  @IsBoolean({ message: 'local_wc must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'local_wc status of the ResidenceAttribute',
  })
  readonly local_wc: boolean;

  @IsBoolean({ message: 'wc must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'wc status of the ResidenceAttribute',
  })
  readonly wc: boolean;

  @IsBoolean({ message: 'pool_table must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'pool_table status of the ResidenceAttribute',
  })
  readonly pool_table: boolean;

  @IsBoolean({ message: 'ping_pong_table must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'ping_pong_table status of the ResidenceAttribute',
  })
  readonly ping_pong_table: boolean;

  @IsBoolean({ message: 'pool must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'pool status of the ResidenceAttribute',
  })
  readonly pool: boolean;
}

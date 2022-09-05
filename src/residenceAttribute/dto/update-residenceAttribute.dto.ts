import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateResidenceAttributeDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceAttribute',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsPositive({ message: 'residence_size must be a positive number' })
  @ApiProperty({
    required: false,
    example: 60,
    description: 'residence_size of the ResidenceAttribute',
  })
  readonly residence_size?: number;

  @IsOptional()
  @IsPositive({ message: 'residence_yard_size must be a positive number' })
  @ApiProperty({
    required: false,
    example: 30,
    description: 'residence_yard_size of the ResidenceAttribute',
  })
  readonly residence_yard_size?: number;

  @IsOptional()
  @IsPositive({ message: 'bedroom_count must be a positive number' })
  @ApiProperty({
    required: false,
    example: 2,
    description: 'bedroom_count of the ResidenceAttribute',
  })
  readonly bedroom_count?: number;

  @IsOptional()
  @IsPositive({ message: 'capacity must be a positive number' })
  @ApiProperty({
    required: false,
    example: 3,
    description: 'capacity of the ResidenceAttribute',
  })
  readonly capacity?: number;

  @IsOptional()
  @IsString({ message: 'in_time must be a string' })
  @ApiProperty({
    required: false,
    example: '14:00:00',
    description: 'in_time of the ResidenceAttribute',
  })
  readonly in_time?: string;

  @IsOptional()
  @IsString({ message: 'out_time must be a string' })
  @ApiProperty({
    required: false,
    example: '10:00:00',
    description: 'capacity of the ResidenceAttribute',
  })
  readonly out_time?: string;

  @IsOptional()
  @IsBoolean({ message: 'pet must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'pet status of the ResidenceAttribute',
  })
  readonly pet?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'instant_delivery must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'instant_delivery status of the ResidenceAttribute',
  })
  readonly instant_delivery?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'dishes must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'dishes status of the ResidenceAttribute',
  })
  readonly dishes?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'dining_table status of the ResidenceAttribute',
  })
  readonly dining_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'microwave must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'microwave status of the ResidenceAttribute',
  })
  readonly microwave?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'fridge must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'fridge status of the ResidenceAttribute',
  })
  readonly fridge?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'water must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'water status of the ResidenceAttribute',
  })
  readonly water?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'electricity must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'electricity status of the ResidenceAttribute',
  })
  readonly electricity?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'gas must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'gas status of the ResidenceAttribute',
  })
  readonly gas?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tv must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'tv status of the ResidenceAttribute',
  })
  readonly tv?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'elevator must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'elevator status of the ResidenceAttribute',
  })
  readonly elevator?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'local_wc must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'local_wc status of the ResidenceAttribute',
  })
  readonly local_wc?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'wc must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'wc status of the ResidenceAttribute',
  })
  readonly wc?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'pool_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'pool_table status of the ResidenceAttribute',
  })
  readonly pool_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'ping_pong_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'ping_pong_table status of the ResidenceAttribute',
  })
  readonly ping_pong_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'pool must be a boolean' })
  @ApiProperty({
    required: false,
    example: false,
    description: 'pool status of the ResidenceAttribute',
  })
  readonly pool?: boolean;

  @IsBoolean({ message: 'vip must be a boolean' })
  @ApiProperty({
    example: false,
    description: 'vip status of the ResidenceAttribute',
  })
  readonly vip?: boolean;
}

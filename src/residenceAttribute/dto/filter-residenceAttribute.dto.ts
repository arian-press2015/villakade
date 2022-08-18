import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class FilterResidenceAttributeDto {
  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: '12345',
    description: 'residence_id of the ResidenceAttribute',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_size must be a positive number' })
  @ApiProperty({
    example: '60',
    description: 'residence_size of the ResidenceAttribute',
  })
  readonly residence_size?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_yard_size must be a positive number' })
  @ApiProperty({
    example: '30',
    description: 'residence_yard_size of the ResidenceAttribute',
  })
  readonly residence_yard_size?: string;

  @IsOptional()
  @IsNumberString({ message: 'bedroom_count must be a positive number' })
  @ApiProperty({
    example: '2',
    description: 'bedroom_count of the ResidenceAttribute',
  })
  readonly bedroom_count?: string;

  @IsOptional()
  @IsNumberString({ message: 'capacity must be a positive number' })
  @ApiProperty({
    example: '3',
    description: 'capacity of the ResidenceAttribute',
  })
  readonly capacity?: string;

  @IsOptional()
  @IsString({ message: 'in_time must be a string' })
  @ApiProperty({
    example: '14:00:00',
    description: 'in_time of the ResidenceAttribute',
  })
  readonly in_time?: string;

  @IsOptional()
  @IsString({ message: 'out_time must be a string' })
  @ApiProperty({
    example: '10:00:00',
    description: 'capacity of the ResidenceAttribute',
  })
  readonly out_time?: string;

  @IsOptional()
  @IsString({ message: 'pet must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'pet status of the ResidenceAttribute',
  })
  readonly pet?: string;

  @IsOptional()
  @IsString({ message: 'instant_delivery must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'instant_delivery status of the ResidenceAttribute',
  })
  readonly instant_delivery?: string;

  @IsOptional()
  @IsString({ message: 'dishes must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'dishes status of the ResidenceAttribute',
  })
  readonly dishes?: string;

  @IsOptional()
  @IsString({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'dining_table status of the ResidenceAttribute',
  })
  readonly dining_table?: string;

  @IsOptional()
  @IsString({ message: 'microwave must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'microwave status of the ResidenceAttribute',
  })
  readonly microwave?: string;

  @IsOptional()
  @IsString({ message: 'fridge must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'fridge status of the ResidenceAttribute',
  })
  readonly fridge?: string;

  @IsOptional()
  @IsString({ message: 'water must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'water status of the ResidenceAttribute',
  })
  readonly water?: string;

  @IsOptional()
  @IsString({ message: 'electricity must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'electricity status of the ResidenceAttribute',
  })
  readonly electricity?: string;

  @IsOptional()
  @IsString({ message: 'gas must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'gas status of the ResidenceAttribute',
  })
  readonly gas?: string;

  @IsOptional()
  @IsString({ message: 'tv must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'tv status of the ResidenceAttribute',
  })
  readonly tv?: string;

  @IsOptional()
  @IsString({ message: 'elevator must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'elevator status of the ResidenceAttribute',
  })
  readonly elevator?: string;

  @IsOptional()
  @IsString({ message: 'local_wc must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'local_wc status of the ResidenceAttribute',
  })
  readonly local_wc?: string;

  @IsOptional()
  @IsString({ message: 'wc must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'wc status of the ResidenceAttribute',
  })
  readonly wc?: string;

  @IsOptional()
  @IsString({ message: 'pool_table must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'pool_table status of the ResidenceAttribute',
  })
  readonly pool_table?: string;

  @IsOptional()
  @IsString({ message: 'ping_pong_table must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'ping_pong_table status of the ResidenceAttribute',
  })
  readonly ping_pong_table?: string;

  @IsOptional()
  @IsString({ message: 'pool must be a boolean' })
  @ApiProperty({
    example: 'false',
    description: 'pool status of the ResidenceAttribute',
  })
  readonly pool?: string;
}

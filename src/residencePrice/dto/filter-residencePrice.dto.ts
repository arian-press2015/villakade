import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterResidencePriceDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @ApiProperty({
    required: false,
    example: 'field1:asc,field2:desc',
    description: 'sort of the residence',
  })
  readonly sort?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 123,
    description: 'residence_id of the residence_price',
  })
  readonly residence_id?: string;

  @IsOptional({ message: 'weekday_price is required' })
  @IsNumberString({ message: 'weekday_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_weekday_price of the residence',
  })
  readonly min_weekday_price?: string;

  @IsOptional({ message: 'weekday_price is required' })
  @IsNumberString({ message: 'weekday_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_weekday_price of the residence',
  })
  readonly max_weekday_price?: string;

  @IsOptional({ message: 'weekend_price is required' })
  @IsNumberString({ message: 'weekend_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_weekend_price of the residence',
  })
  readonly min_weekend_price?: string;

  @IsOptional({ message: 'weekend_price is required' })
  @IsNumberString({ message: 'weekend_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_weekend_price of the residence',
  })
  readonly max_weekend_price?: string;

  @IsOptional({ message: 'peak_price is required' })
  @IsNumberString({ message: 'peak_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_peak_price of the residence',
  })
  readonly min_peak_price?: string;

  @IsOptional({ message: 'peak_price is required' })
  @IsNumberString({ message: 'peak_price must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_peak_price of the residence',
  })
  readonly max_peak_price?: string;

  @IsOptional({ message: 'extra_guest_weekday is required' })
  @IsNumberString({ message: 'extra_guest_weekday must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_extra_guest_weekday of the residence',
  })
  readonly min_extra_guest_weekday?: string;

  @IsOptional({ message: 'extra_guest_weekday is required' })
  @IsNumberString({ message: 'extra_guest_weekday must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_extra_guest_weekday of the residence',
  })
  readonly max_extra_guest_weekday?: string;

  @IsOptional({ message: 'extra_guest_weekend is required' })
  @IsNumberString({ message: 'extra_guest_weekend must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_extra_guest_weekend of the residence',
  })
  readonly min_extra_guest_weekend?: string;

  @IsOptional({ message: 'extra_guest_weekend is required' })
  @IsNumberString({ message: 'extra_guest_weekend must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_extra_guest_weekend of the residence',
  })
  readonly max_extra_guest_weekend?: string;

  @IsOptional({ message: 'extra_guest_peak is required' })
  @IsNumberString({ message: 'extra_guest_peak must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'min_extra_guest_peak of the residence',
  })
  readonly min_extra_guest_peak?: string;

  @IsOptional({ message: 'extra_guest_peak is required' })
  @IsNumberString({ message: 'extra_guest_peak must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max_extra_guest_peak of the residence',
  })
  readonly max_extra_guest_peak?: string;
}

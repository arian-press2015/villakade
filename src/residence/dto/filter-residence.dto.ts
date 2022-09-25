import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumberString,
  IsString,
  IsBooleanString,
} from 'class-validator';

export class FilterResidenceDto {
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
  @IsNumberString({ message: 'host_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'host_id of the residence',
  })
  readonly host_id?: string;

  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title?: string;

  @IsOptional()
  @IsNumberString({ message: 'type_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'type_id of the residence',
  })
  readonly type_id?: string;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    required: false,
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location?: string;

  @IsOptional()
  @IsNumberString({ message: 'city_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'city_id of the residence',
  })
  readonly city_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'activation status must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'activity status of the residence',
  })
  readonly active?: string;

  @IsOptional({ message: 'normal_capacity is required' })
  @IsNumberString({ message: 'normal_capacity must be a number' })
  @ApiProperty({
    required: false,
    example: 2,
    description: 'normal capacity of the residence',
  })
  readonly normal_capacity?: number;

  @IsOptional({ message: 'max_capacity is required' })
  @IsNumberString({ message: 'max_capacity must be a number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'max capacity of the residence',
  })
  readonly max_capacity?: number;

  @IsOptional({ message: 'about is required' })
  @IsString({ message: 'about must be a string' })
  @ApiProperty({
    required: false,
    example: 'ویلاست دیگه چی میخای',
    description: 'about the Residence',
  })
  readonly about?: string;

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

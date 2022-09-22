import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateResidenceDto {
  @IsOptional()
  @IsPositive({ message: 'host_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'host_id of the residence',
  })
  readonly host_id?: number;

  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title?: string;

  @IsOptional()
  @IsPositive({ message: 'type_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'type_id of the residence',
  })
  readonly type_id?: number;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    required: false,
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location?: string;

  @IsOptional()
  @IsPositive({ message: 'city_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'city_id of the residence',
  })
  readonly city_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'activity status of the residence',
  })
  readonly active?: boolean;

  @IsOptional({ message: 'normal_capacity is required' })
  @IsPositive({ message: 'normal_capacity must be a number' })
  @ApiProperty({
    required: false,
    example: 2,
    description: 'normal capacity of the residence',
  })
  readonly normal_capacity?: number;

  @IsOptional({ message: 'max_capacity is required' })
  @IsPositive({ message: 'max_capacity must be a number' })
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
}

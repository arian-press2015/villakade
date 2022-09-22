import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateResidenceDto {
  @IsNotEmpty({ message: 'host_id is required' })
  @IsPositive({ message: 'host_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'host_id of the residence' })
  readonly host_id: number;

  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title: string;

  @IsNotEmpty({ message: 'type_id is required' })
  @IsPositive({ message: 'type_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'type_id of the residence' })
  readonly type_id: number;

  @IsNotEmpty({ message: 'location is required' })
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location: string;

  @IsNotEmpty({ message: 'city_id is required' })
  @IsPositive({ message: 'city_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'city_id of the residence' })
  readonly city_id: number;

  @IsNotEmpty({ message: 'activation status is required' })
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active: boolean;

  @IsNotEmpty({ message: 'normal_capacity is required' })
  @IsPositive({ message: 'normal_capacity must be a number' })
  @ApiProperty({
    example: 2,
    description: 'normal capacity of the residence',
  })
  readonly normal_capacity: number;

  @IsNotEmpty({ message: 'max_capacity is required' })
  @IsPositive({ message: 'max_capacity must be a number' })
  @ApiProperty({
    example: 4,
    description: 'max capacity of the residence',
  })
  readonly max_capacity: number;

  @IsNotEmpty({ message: 'about is required' })
  @IsString({ message: 'about must be a string' })
  @ApiProperty({
    example: 'ویلاست دیگه چی میخای',
    description: 'about the Residence',
  })
  readonly about: string;
}

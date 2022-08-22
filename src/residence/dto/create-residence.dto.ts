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

  @IsNotEmpty({ message: 'price is required' })
  @IsPositive({ message: 'price must be a positive number' })
  @ApiProperty({ example: 200000, description: 'price of the residence' })
  readonly price: number;

  @IsNotEmpty({ message: 'activation status is required' })
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active: boolean;
}

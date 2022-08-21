import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsPositive, IsString } from 'class-validator';

export class CreateResidenceDto {
  @IsPositive({ message: 'host_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'host_id of the residence' })
  readonly host_id: number;

  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title: string;

  @IsPositive({ message: 'type_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'type_id of the residence' })
  readonly type_id: number;

  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location: string;

  @IsPositive({ message: 'city_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'city_id of the residence' })
  readonly city_id: number;

  @IsPositive({ message: 'price must be a positive number' })
  @ApiProperty({ example: 200000, description: 'price of the residence' })
  readonly price: number;

  @IsBoolean({ message: 'active must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active: boolean;
}

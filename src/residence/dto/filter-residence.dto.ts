import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class FilterResidenceDto {
  @IsOptional()
  @IsNumberString({ message: 'host_id must be a positive number' })
  @ApiProperty({ example: '12345', description: 'host_id of the residence' })
  readonly host_id?: string;

  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title?: string;

  @IsOptional()
  @IsNumberString({ message: 'type_id must be a positive number' })
  @ApiProperty({ example: '12345', description: 'type_id of the residence' })
  readonly type_id?: string;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location?: string;

  @IsOptional()
  @IsNumberString({ message: 'city_id must be a positive number' })
  @ApiProperty({ example: '12345', description: 'city_id of the residence' })
  readonly city_id?: string;

  @IsOptional()
  @IsNumberString({ message: 'price must be a positive number' })
  @ApiProperty({ example: '200000', description: 'price of the residence' })
  readonly price?: string;

  @IsOptional()
  @IsString({ message: 'active must be a string' })
  @ApiProperty({
    example: 'true',
    description: 'activity status of the residence',
  })
  readonly active?: string;
}

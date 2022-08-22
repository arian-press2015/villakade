import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateResidenceDto {
  @IsOptional()
  @IsPositive({ message: 'host_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'host_id of the residence' })
  readonly host_id?: number;

  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title?: string;

  @IsOptional()
  @IsPositive({ message: 'type_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'type_id of the residence' })
  readonly type_id?: number;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location?: string;

  @IsOptional()
  @IsPositive({ message: 'city_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'city_id of the residence' })
  readonly city_id?: number;

  @IsOptional()
  @IsPositive({ message: 'price must be a positive number' })
  @ApiProperty({ example: 200000, description: 'price of the residence' })
  readonly price?: number;

  @IsOptional()
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active?: boolean;
}

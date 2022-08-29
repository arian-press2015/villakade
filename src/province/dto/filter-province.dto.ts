import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterProvinceDto {
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
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    required: false,
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterCategoryDto {
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
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    required: false,
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title?: string;
}

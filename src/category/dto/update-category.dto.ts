import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title?: string;
}

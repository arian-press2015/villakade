import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title: string;

  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title: string;
}

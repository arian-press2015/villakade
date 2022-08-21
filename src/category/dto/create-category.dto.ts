import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title: string;

  @IsNotEmpty({ message: 'fa_title is required' })
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title: string;
}

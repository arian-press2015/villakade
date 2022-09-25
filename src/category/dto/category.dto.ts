import { ApiProperty } from '@nestjs/swagger';
import { CategoryImage } from '../../categoryImage/dto';

export class Category {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title: string;

  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title: string;

  @ApiProperty({
    example: {
      category_id: 123,
      url: '/here',
      width: 400,
      height: 500,
    },
    description: 'image of the Category',
  })
  readonly category_image?: CategoryImage;
}

export class RawCategory {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'beach',
    description: 'title of the Category',
  })
  readonly title: string;

  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'fa_title of the Category',
  })
  readonly fa_title: string;
}

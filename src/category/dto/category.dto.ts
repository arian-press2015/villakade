import { ApiProperty } from '@nestjs/swagger';

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
}

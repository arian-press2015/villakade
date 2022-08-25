import { ApiProperty } from '@nestjs/swagger';

export class CategoryImage {
  @ApiProperty({
    example: 12345,
    description: 'category_id of the CategoryImage',
  })
  readonly category_id: number;

  @ApiProperty({
    example: '/fake/image/url',
    description: 'url of the CategoryImage',
  })
  readonly url: string;

  @ApiProperty({
    example: 480,
    description: 'width of the CategoryImage',
  })
  readonly width: number;

  @ApiProperty({
    example: 640,
    description: 'height of the CategoryImage',
  })
  readonly height: number;
}

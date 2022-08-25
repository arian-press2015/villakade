import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCategoryImageDto {
  @IsNotEmpty({ message: 'category_id is required' })
  @IsPositive({ message: 'category_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'category_id of the CategoryImage',
  })
  readonly category_id: number;

  @IsNotEmpty({ message: 'url is required' })
  @IsString({ message: 'url must be a string' })
  @ApiProperty({
    example: '/fake/image/url',
    description: 'url of the CategoryImage',
  })
  readonly url: string;

  @IsNotEmpty({ message: 'width is required' })
  @IsPositive({ message: 'width must be a positive number' })
  @ApiProperty({
    example: 480,
    description: 'width of the CategoryImage',
  })
  readonly width: number;

  @IsNotEmpty({ message: 'height is required' })
  @IsPositive({ message: 'height must be a positive number' })
  @ApiProperty({
    example: 640,
    description: 'height of the CategoryImage',
  })
  readonly height: number;
}

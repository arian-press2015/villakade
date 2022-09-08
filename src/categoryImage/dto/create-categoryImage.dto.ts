import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCategoryImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'image of the CategoryImage',
  })
  readonly file: Express.Multer.File;

  @IsNotEmpty({ message: 'category_id is required' })
  @IsNumberString({ message: 'category_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'category_id of the CategoryImage',
  })
  readonly category_id: number;

  @IsNotEmpty({ message: 'width is required' })
  @IsNumberString({ message: 'width must be a positive number' })
  @ApiProperty({
    example: 480,
    description: 'width of the CategoryImage',
  })
  readonly width: number;

  @IsNotEmpty({ message: 'height is required' })
  @IsNumberString({ message: 'height must be a positive number' })
  @ApiProperty({
    example: 640,
    description: 'height of the CategoryImage',
  })
  readonly height: number;
}

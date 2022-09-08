import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateResidenceImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'image of the CategoryImage',
  })
  readonly file: Express.Multer.File;

  @IsNotEmpty({ message: 'residence_id is required' })
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'width is required' })
  @IsNumberString({ message: 'width must be a positive number' })
  @ApiProperty({
    example: 480,
    description: 'width of the ResidenceImage',
  })
  readonly width: number;

  @IsNotEmpty({ message: 'height is required' })
  @IsNumberString({ message: 'height must be a positive number' })
  @ApiProperty({
    example: 640,
    description: 'height of the ResidenceImage',
  })
  readonly height: number;
}

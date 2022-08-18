import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export class CreateResidenceImageDto {
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;

  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: '/fake/image/url',
    description: 'url of the ResidenceImage',
  })
  readonly url: string;

  @IsPositive({ message: 'width must be a positive number' })
  @ApiProperty({
    example: 480,
    description: 'width of the ResidenceImage',
  })
  readonly width: number;

  @IsPositive({ message: 'height must be a positive number' })
  @ApiProperty({
    example: 640,
    description: 'height of the ResidenceImage',
  })
  readonly height: number;
}

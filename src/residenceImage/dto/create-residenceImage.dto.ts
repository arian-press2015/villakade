import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateResidenceImageDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'url is required' })
  @IsString({ message: 'url must be a string' })
  @ApiProperty({
    example: '/fake/image/url',
    description: 'url of the ResidenceImage',
  })
  readonly url: string;

  @IsNotEmpty({ message: 'width is required' })
  @IsPositive({ message: 'width must be a positive number' })
  @ApiProperty({
    example: 480,
    description: 'width of the ResidenceImage',
  })
  readonly width: number;

  @IsNotEmpty({ message: 'height is required' })
  @IsPositive({ message: 'height must be a positive number' })
  @ApiProperty({
    example: 640,
    description: 'height of the ResidenceImage',
  })
  readonly height: number;
}

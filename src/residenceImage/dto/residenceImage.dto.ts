import { ApiProperty } from '@nestjs/swagger';

export class ResidenceImage {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: '/fake/image/url',
    description: 'url of the ResidenceImage',
  })
  readonly url: string;

  @ApiProperty({
    example: 480,
    description: 'width of the ResidenceImage',
  })
  readonly width: number;

  @ApiProperty({
    example: 640,
    description: 'height of the ResidenceImage',
  })
  readonly height: number;
}

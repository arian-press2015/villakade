import { ApiProperty } from '@nestjs/swagger';

export class ResidenceParking {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceParking',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'roof of the ResidenceParking',
  })
  readonly roof: boolean;

  @ApiProperty({
    example: true,
    description: 'unroofed of the ResidenceParking',
  })
  readonly unroofed: boolean;

  @ApiProperty({
    example: true,
    description: 'public of the ResidenceParking',
  })
  readonly public: boolean;

  @ApiProperty({
    example: true,
    description: 'free_space of the ResidenceParking',
  })
  readonly free_space: boolean;

  @ApiProperty({
    example: 2,
    description: 'capacity of the ResidenceParking',
  })
  readonly capacity: number;
}

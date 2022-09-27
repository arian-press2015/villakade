import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceParkingDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceParking',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'roof is required' })
  @IsBoolean({ message: 'roof must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'roof of the ResidenceParking',
  })
  readonly roof: boolean;

  @IsNotEmpty({ message: 'unroofed is required' })
  @IsBoolean({ message: 'unroofed must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'unroofed of the ResidenceParking',
  })
  readonly unroofed: boolean;

  @IsNotEmpty({ message: 'public is required' })
  @IsBoolean({ message: 'public must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'public of the ResidenceParking',
  })
  readonly public: boolean;

  @IsNotEmpty({ message: 'free_space is required' })
  @IsBoolean({ message: 'free_space must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'free_space of the ResidenceParking',
  })
  readonly free_space: boolean;

  @IsNotEmpty({ message: 'capacity is required' })
  @IsPositive({ message: 'capacity must be a positive number' })
  @ApiProperty({
    example: 2,
    description: 'capacity of the ResidenceParking',
  })
  readonly capacity: number;
}

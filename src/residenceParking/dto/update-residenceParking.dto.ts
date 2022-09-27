import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceParkingDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceParking',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'roof must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'roof of the ResidenceParking',
  })
  readonly roof?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'unroofed must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'unroofed of the ResidenceParking',
  })
  readonly unroofed?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'public must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'public of the ResidenceParking',
  })
  readonly public?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'free_space must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'free_space of the ResidenceParking',
  })
  readonly free_space?: boolean;

  @IsOptional()
  @IsPositive({ message: 'capacity must be a positive number' })
  @ApiProperty({
    required: false,
    example: 2,
    description: 'capacity of the ResidenceParking',
  })
  readonly capacity?: number;
}

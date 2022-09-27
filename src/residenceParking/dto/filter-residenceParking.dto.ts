import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceParkingDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @ApiProperty({
    required: false,
    example: 'field1:asc,field2:desc',
    description: 'sort of the residence',
  })
  readonly sort?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceParking',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'roof must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'roof of the ResidenceParking',
  })
  readonly roof?: string;

  @IsOptional()
  @IsBooleanString({ message: 'unroofed must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'unroofed of the ResidenceParking',
  })
  readonly unroofed?: string;

  @IsOptional()
  @IsBooleanString({ message: 'public must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'public of the ResidenceParking',
  })
  readonly public?: string;

  @IsOptional()
  @IsBooleanString({ message: 'free_space must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'free_space of the ResidenceParking',
  })
  readonly free_space?: string;

  @IsOptional()
  @IsBooleanString({ message: 'capacity must be a positive number' })
  @ApiProperty({
    required: false,
    example: '2',
    description: 'capacity of the ResidenceParking',
  })
  readonly min_capacity?: string;

  @IsOptional()
  @IsBooleanString({ message: 'capacity must be a positive number' })
  @ApiProperty({
    required: false,
    example: '2',
    description: 'capacity of the ResidenceParking',
  })
  readonly max_capacity?: string;
}

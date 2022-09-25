import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class UpdateResidencePriceDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 123,
    description: 'residence_id of the residence_price',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsPositive({ message: 'weekday_price must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'weekday_price of the residence_price',
  })
  readonly weekday_price?: number;

  @IsOptional()
  @IsPositive({ message: 'weekend_price must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'weekend_price of the residence_price',
  })
  readonly weekend_price?: number;

  @IsOptional()
  @IsPositive({ message: 'peak_price must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'peak_price of the residence_price',
  })
  readonly peak_price?: number;

  @IsOptional()
  @IsPositive({ message: 'extra_guest_weekday must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'extra_guest_weekday of the residence_price',
  })
  readonly extra_guest_weekday?: number;

  @IsOptional()
  @IsPositive({ message: 'extra_guest_weekend must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'extra_guest_weekend of the residence_price',
  })
  readonly extra_guest_weekend?: number;

  @IsOptional()
  @IsPositive({ message: 'extra_guest_peak must be a positive number' })
  @ApiProperty({
    required: false,
    example: 4,
    description: 'extra_guest_peak of the residence_price',
  })
  readonly extra_guest_peak?: number;
}

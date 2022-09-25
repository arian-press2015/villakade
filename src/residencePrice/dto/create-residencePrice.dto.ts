import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidencePriceDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'residence_id of the residence_price',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'weekday_price is required' })
  @IsPositive({ message: 'weekday_price must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'weekday_price of the residence_price',
  })
  readonly weekday_price: number;

  @IsNotEmpty({ message: 'weekend_price is required' })
  @IsPositive({ message: 'weekend_price must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'weekend_price of the residence_price',
  })
  readonly weekend_price: number;

  @IsNotEmpty({ message: 'peak_price is required' })
  @IsPositive({ message: 'peak_price must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'peak_price of the residence_price',
  })
  readonly peak_price: number;

  @IsNotEmpty({ message: 'extra_guest_weekday is required' })
  @IsPositive({ message: 'extra_guest_weekday must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'extra_guest_weekday of the residence_price',
  })
  readonly extra_guest_weekday: number;

  @IsNotEmpty({ message: 'extra_guest_weekend is required' })
  @IsPositive({ message: 'extra_guest_weekend must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'extra_guest_weekend of the residence_price',
  })
  readonly extra_guest_weekend: number;

  @IsNotEmpty({ message: 'extra_guest_peak is required' })
  @IsPositive({ message: 'extra_guest_peak must be a positive number' })
  @ApiProperty({
    example: 4,
    description: 'extra_guest_peak of the residence_price',
  })
  readonly extra_guest_peak: number;
}

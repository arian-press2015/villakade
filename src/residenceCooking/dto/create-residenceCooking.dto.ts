import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceCookingDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceCooking',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'fridge is required' })
  @IsBoolean({ message: 'fridge must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'fridge of the ResidenceCooking',
  })
  readonly fridge: boolean;

  @IsNotEmpty({ message: 'microwave is required' })
  @IsBoolean({ message: 'microwave must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'microwave of the ResidenceCooking',
  })
  readonly microwave: boolean;

  @IsNotEmpty({ message: 'pan is required' })
  @IsBoolean({ message: 'pan must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'pan of the ResidenceCooking',
  })
  readonly pan: boolean;

  @IsNotEmpty({ message: 'pot is required' })
  @IsBoolean({ message: 'pot must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'pot of the ResidenceCooking',
  })
  readonly pot: boolean;

  @IsNotEmpty({ message: 'grill is required' })
  @IsBoolean({ message: 'grill must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'grill of the ResidenceCooking',
  })
  readonly grill: boolean;

  @IsNotEmpty({ message: 'skewer is required' })
  @IsBoolean({ message: 'skewer must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'skewer of the ResidenceCooking',
  })
  readonly skewer: boolean;

  @IsNotEmpty({ message: 'oven is required' })
  @IsBoolean({ message: 'oven must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'oven of the ResidenceCooking',
  })
  readonly oven: boolean;

  @IsNotEmpty({ message: 'lighter is required' })
  @IsBoolean({ message: 'lighter must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'lighter of the ResidenceCooking',
  })
  readonly lighter: boolean;
}

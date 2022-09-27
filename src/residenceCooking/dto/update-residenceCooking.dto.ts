import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceCookingDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceCooking',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'fridge must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fridge of the ResidenceCooking',
  })
  readonly fridge?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'microwave must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'microwave of the ResidenceCooking',
  })
  readonly microwave?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'pan must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'pan of the ResidenceCooking',
  })
  readonly pan?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'pot must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'pot of the ResidenceCooking',
  })
  readonly pot?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'grill must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'grill of the ResidenceCooking',
  })
  readonly grill?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'skewer must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'skewer of the ResidenceCooking',
  })
  readonly skewer?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'oven must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'oven of the ResidenceCooking',
  })
  readonly oven?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'lighter must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'lighter of the ResidenceCooking',
  })
  readonly lighter?: boolean;
}

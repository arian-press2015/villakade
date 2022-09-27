import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceCookingDto {
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
    description: 'residence_id of the ResidenceCooking',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'fridge must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fridge of the ResidenceCooking',
  })
  readonly fridge?: string;

  @IsOptional()
  @IsBooleanString({ message: 'microwave must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'microwave of the ResidenceCooking',
  })
  readonly microwave?: string;

  @IsOptional()
  @IsBooleanString({ message: 'pan must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'pan of the ResidenceCooking',
  })
  readonly pan?: string;

  @IsOptional()
  @IsBooleanString({ message: 'pot must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'pot of the ResidenceCooking',
  })
  readonly pot?: string;

  @IsOptional()
  @IsBooleanString({ message: 'grill must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'grill of the ResidenceCooking',
  })
  readonly grill?: string;

  @IsOptional()
  @IsBooleanString({ message: 'skewer must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'skewer of the ResidenceCooking',
  })
  readonly skewer?: string;

  @IsOptional()
  @IsBooleanString({ message: 'oven must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'oven of the ResidenceCooking',
  })
  readonly oven?: string;

  @IsOptional()
  @IsBooleanString({ message: 'lighter must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'lighter of the ResidenceCooking',
  })
  readonly lighter?: string;
}

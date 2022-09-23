import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceCategoryDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({ example: 12345, description: 'residence_id of the residence' })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'category_id is required' })
  @IsPositive({ message: 'category_id must be a number array', each: true })
  @ApiProperty({
    example: [12345, 54321],
    isArray: true,
    description: 'category_id of the residence',
  })
  readonly category_id: number[];
}

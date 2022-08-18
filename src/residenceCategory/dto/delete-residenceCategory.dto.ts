import { ApiProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class DeleteResidenceCategoryDto {
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceCategory',
  })
  readonly residence_id: number;

  @IsPositive({ message: 'category_id must be a positive number' })
  @ApiProperty({
    example: 123,
    description: 'category_id of the ResidenceCategory',
  })
  readonly category_id: number;
}

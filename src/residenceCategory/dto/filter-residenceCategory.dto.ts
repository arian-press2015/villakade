import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterResidenceCategoryDto {
  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: '12345',
    description: 'residence_id of the ResidenceCategory',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsNumberString({ message: 'category_id must be a positive number' })
  @ApiProperty({
    example: '123',
    description: 'category_id of the ResidenceCategory',
  })
  readonly category_id?: string;
}

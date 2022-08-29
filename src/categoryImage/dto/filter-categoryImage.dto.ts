import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterCategoryImageDto {
  @IsOptional()
  @IsNumberString({ message: 'category_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'category_id of the CategoryImage',
  })
  readonly category_id: string;
}

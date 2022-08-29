import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateCategoryImageDto {
  @IsOptional()
  @IsPositive({ message: 'category_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'category_id of the CategoryImage',
  })
  readonly category_id: number;
}

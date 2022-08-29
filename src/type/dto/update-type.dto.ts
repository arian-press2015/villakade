import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'apartment',
    description: 'title of the Type',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    required: false,
    example: 'آپارتمان',
    description: 'fa_title of the Type',
  })
  readonly fa_title?: string;
}

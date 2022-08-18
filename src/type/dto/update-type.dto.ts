import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'apartment',
    description: 'title of the Type',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'آپارتمان',
    description: 'fa_title of the Type',
  })
  readonly fa_title?: string;
}

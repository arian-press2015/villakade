import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'apartment',
    description: 'title of the Type',
  })
  readonly title: string;

  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'آپارتمان',
    description: 'fa_title of the Type',
  })
  readonly fa_title: string;
}

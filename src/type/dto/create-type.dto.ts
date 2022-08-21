import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'apartment',
    description: 'title of the Type',
  })
  readonly title: string;

  @IsNotEmpty({ message: 'fa_title is required' })
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'آپارتمان',
    description: 'fa_title of the Type',
  })
  readonly fa_title: string;
}

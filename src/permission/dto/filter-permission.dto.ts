import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterPermissionDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title?: string;
}

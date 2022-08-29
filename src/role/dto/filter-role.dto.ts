import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterRoleDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'residence-management',
    description: 'title of the Role',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    required: false,
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Role',
  })
  readonly fa_title?: string;
}

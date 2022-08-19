import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterRoleDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'residence-management',
    description: 'title of the Role',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Role',
  })
  readonly fa_title?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'residence-management',
    description: 'title of the Role',
  })
  readonly title: string;

  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Role',
  })
  readonly fa_title: string;
}

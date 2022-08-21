import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'residence-management',
    description: 'title of the Role',
  })
  readonly title: string;

  @IsNotEmpty({ message: 'fa_title is required' })
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Role',
  })
  readonly fa_title: string;
}

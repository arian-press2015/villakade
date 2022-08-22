import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title: string;

  @IsNotEmpty({ message: 'fa_title is required' })
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title: string;

  @IsString({ message: 'Fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title: string;
}

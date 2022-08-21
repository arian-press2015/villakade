import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title: string;

  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title: string;
}

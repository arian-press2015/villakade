import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: 'fa_title must be a string' })
  @ApiProperty({
    required: false,
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title?: string;
}

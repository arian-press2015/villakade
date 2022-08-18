import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProvinceDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name: string;

  @IsString({ message: 'Fa_name must be a string' })
  @ApiProperty({
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name: string;
}

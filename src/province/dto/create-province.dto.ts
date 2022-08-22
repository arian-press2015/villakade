import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name: string;

  @IsNotEmpty({ message: 'fa_name is required' })
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterProvinceDto {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @ApiProperty({
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'fa_name must be a string' })
  @ApiProperty({
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name?: string;
}

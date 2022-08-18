import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProvinceDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'Fa_name must be a string' })
  @ApiProperty({
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMyHostDto {
  @IsOptional()
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'arian',
    description: 'first_name of the Host',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString({ message: 'last_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'press2015',
    description: 'last_name of the Host',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    required: false,
    example: '+989012883045',
    description: 'phone of the Host',
  })
  readonly phone?: string;
}

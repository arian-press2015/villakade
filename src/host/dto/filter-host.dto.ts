import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterHostDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Host',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString({ message: 'Last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Host',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Host',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'Vip must be a string' })
  @ApiProperty({
    example: 'true',
    description: 'vip status of the Host',
  })
  readonly vip?: string;

  @IsOptional()
  @IsString({ message: 'Active must be a string' })
  @ApiProperty({
    example: 'true',
    description: 'activation status of the Host',
  })
  readonly active?: string;
}

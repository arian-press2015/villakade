import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class FilterCustomerDto {
  @IsOptional()
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'arian',
    description: 'first_name of the Customer',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString({ message: 'last_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'press2015',
    description: 'last_name of the Customer',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    required: false,
    example: '+989012883045',
    description: 'phone of the Customer',
  })
  readonly phone?: string;

  @IsOptional()
  @IsBooleanString({ message: 'activation status must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'activation status of the Customer',
  })
  readonly active?: string;
}

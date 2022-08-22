import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'first_name is required' })
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Customer',
  })
  readonly first_name: string;

  @IsNotEmpty({ message: 'last_name is required' })
  @IsString({ message: 'last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Customer',
  })
  readonly last_name: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Customer',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'activation status is required' })
  @IsBoolean({ message: 'active must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activation status of the Customer',
  })
  readonly active: boolean;
}

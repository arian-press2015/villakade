import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Customer',
  })
  readonly first_name: string;

  @IsString({ message: 'Last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Customer',
  })
  readonly last_name: string;

  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Customer',
  })
  readonly phone: string;

  @IsBoolean({ message: 'Active must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activation status of the Customer',
  })
  readonly active: boolean;
}

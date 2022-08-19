import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Customer',
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Customer',
  })
  readonly last_name: string;

  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Customer',
  })
  readonly phone: string;

  @ApiProperty({
    example: true,
    description: 'activation status of the Customer',
  })
  readonly active: boolean;
}

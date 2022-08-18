import { ApiProperty } from '@nestjs/swagger';

export class Host {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Host',
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Host',
  })
  readonly last_name: string;

  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Host',
  })
  readonly phone: string;

  @ApiProperty({
    example: true,
    description: 'vip status of the Host',
  })
  readonly vip: boolean;

  @ApiProperty({
    example: true,
    description: 'activation status of the Host',
  })
  readonly active: boolean;
}

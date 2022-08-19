import { ApiProperty } from '@nestjs/swagger';

export class Owner {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Owner',
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Owner',
  })
  readonly last_name: string;

  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Owner',
  })
  readonly phone: string;

  @ApiProperty({
    example: 'AP2015',
    description: 'username of the Owner',
  })
  readonly username: string;

  @ApiProperty({
    example: 'APPassword',
    description: 'password of the Owner',
  })
  readonly password: string;

  @ApiProperty({
    example: 12345,
    description: 'role of the Owner',
  })
  readonly role_id: number;
}

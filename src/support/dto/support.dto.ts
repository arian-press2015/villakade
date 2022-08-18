import { ApiProperty } from '@nestjs/swagger';

export class Support {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the Support',
  })
  readonly full_name: string;

  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Support',
  })
  readonly phone: string;

  @ApiProperty({
    example: true,
    description: 'activation status of the Support',
  })
  readonly active: boolean;
}

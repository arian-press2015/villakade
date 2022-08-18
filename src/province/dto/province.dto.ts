import { ApiProperty } from '@nestjs/swagger';

export class Province {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'fars',
    description: 'name of the Province',
  })
  readonly name: string;

  @ApiProperty({
    example: 'فارس',
    description: 'fa_name of the Province',
  })
  readonly fa_name: string;
}

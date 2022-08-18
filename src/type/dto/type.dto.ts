import { ApiProperty } from '@nestjs/swagger';

export class Type {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'apartment',
    description: 'title of the Type',
  })
  readonly title: string;

  @ApiProperty({
    example: 'آپارتمان',
    description: 'fa_title of the Type',
  })
  readonly fa_title: string;
}

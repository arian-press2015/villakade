import { ApiProperty } from '@nestjs/swagger';

export class Permission {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'delete-residence',
    description: 'title of the Permission',
  })
  readonly title: string;

  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Permission',
  })
  readonly fa_title: string;
}

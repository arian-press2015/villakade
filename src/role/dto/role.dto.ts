import { ApiProperty } from '@nestjs/swagger';

export class Role {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'residence-management',
    description: 'title of the Role',
  })
  readonly title: string;

  @ApiProperty({
    example: 'ویرایش اقامتگاه ها',
    description: 'fa_title of the Role',
  })
  readonly fa_title: string;
}

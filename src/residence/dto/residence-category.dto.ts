import { ApiProperty } from '@nestjs/swagger';

export class ResidenceCategory {
  @ApiProperty({ example: 12345, description: 'residence_id of the residence' })
  readonly residence_id: number;

  @ApiProperty({
    example: 12345,
    description: 'category_id of the residence',
  })
  readonly category_id: number;
}

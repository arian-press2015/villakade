import { ApiProperty } from '@nestjs/swagger';

export class ResidenceCategory {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceCategory',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 123,
    description: 'category_id of the ResidenceCategory',
  })
  readonly category_id: number;
}

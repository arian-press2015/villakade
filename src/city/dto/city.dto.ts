import { ApiProperty } from '@nestjs/swagger';

export class City {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({ example: 12345, description: 'Province_id of the city' })
  readonly province_id: number;

  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name: string;

  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name: string;

  @ApiProperty({
    example: 12,
    description: 'residence count in this city',
  })
  readonly total_residence_count: number;
}

export class ProvinceCity {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'shiraz',
    description: 'name of the City',
  })
  readonly name: string;

  @ApiProperty({
    example: 'شیراز',
    description: 'fa_name of the City',
  })
  readonly fa_name: string;

  @ApiProperty({
    example: 12,
    description: 'residence count in this city',
  })
  readonly total_residence_count: number;
}

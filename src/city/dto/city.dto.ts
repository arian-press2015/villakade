import { ApiProperty } from '@nestjs/swagger';
import { ProvinceUnpopulated } from '../../province/dto';

export class City {
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

  @ApiProperty({
    example: {
      id: 1,
      name: 'shiraz',
      fa_name: 'شیراز',
    },
    description: 'ID of the entity in database',
  })
  readonly province: ProvinceUnpopulated;
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

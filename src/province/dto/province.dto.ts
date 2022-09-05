import { ApiProperty } from '@nestjs/swagger';
import { ProvinceCity } from '../../city/dto';

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

  @ApiProperty({
    example: [
      {
        id: 123,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 12,
      },
    ],
    description: 'cities of the Province',
  })
  readonly cities: ProvinceCity[];
}

export class ProvinceUnpopulated {
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

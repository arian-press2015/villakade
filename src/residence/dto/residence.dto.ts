import { ApiProperty } from '@nestjs/swagger';
import { City } from '../../city/dto';
import { ResidencePrice } from '../../residenceAttribute/dto';
import { ResidenceImage } from '../../residenceImage/dto';
import { Type } from '../../type/dto';

export class Residence {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({ example: 12345, description: 'host_id of the residence' })
  readonly host_id: number;

  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title: string;

  @ApiProperty({
    example: {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    },
    description: 'type of the residence',
  })
  readonly type: Type;

  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location: string;

  @ApiProperty({
    example: {
      id: 1,
      name: 'shiraz',
      fa_name: 'شیراز',
      total_residence_count: 4,
      province: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
      },
    },
    description: 'city_id of the residence',
  })
  readonly city: City;

  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active: boolean;

  @ApiProperty({
    example: 2,
    description: 'normal capacity of the residence',
  })
  readonly normal_capacity: number;

  @ApiProperty({
    example: 4,
    description: 'max capacity of the residence',
  })
  readonly max_capacity: number;

  @ApiProperty({
    example: 'ویلاست دیگه چی میخای',
    description: 'about the Residence',
  })
  readonly about: string;

  @ApiProperty({
    example: {
      weekday_price: 10,
      weekend_price: 10,
      peak_price: 10,
      extra_guest_weekday: 10,
      extra_guest_weekend: 10,
      extra_guest_peak: 10,
    },
    description: 'price of the Residence',
  })
  readonly residence_price: ResidencePrice;

  @ApiProperty({
    example: [
      {
        id: 111,
        residence_id: 123,
        url: '/file/is/here',
        width: 400,
        height: 600,
      },
    ],
    description: 'images of the Residence',
  })
  readonly residence_image: ResidenceImage[];
}

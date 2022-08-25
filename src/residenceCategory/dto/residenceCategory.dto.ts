import { ApiProperty } from '@nestjs/swagger';

export class ResidenceCategory {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({ example: 12345, description: 'host_id of the residence' })
  readonly host_id: number;

  @ApiProperty({
    example: 'آپارتمان در شیراز',
    description: 'title of the Residence',
  })
  readonly title: string;

  @ApiProperty({ example: 12345, description: 'type_id of the residence' })
  readonly type_id: number;

  @ApiProperty({
    example: 'شیراز دست چپ پلاک دو',
    description: 'location of the Residence',
  })
  readonly location: string;

  @ApiProperty({ example: 12345, description: 'city_id of the residence' })
  readonly city_id: number;

  @ApiProperty({ example: 200000, description: 'price of the residence' })
  readonly price: number;

  @ApiProperty({
    example: true,
    description: 'activity status of the residence',
  })
  readonly active: boolean;

  @ApiProperty({
    example: 123,
    description: 'category_id of the ResidenceCategory',
  })
  readonly category_id: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class ResidenceWcBathroom {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceWcBathroom',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 'خونه را کثیف نکنین لطفا',
    description: 'location of the ResidenceWcBathroom',
  })
  readonly location: string;

  @ApiProperty({
    example: true,
    description: 'local_wc of the ResidenceWcBathroom',
  })
  readonly local_wc: boolean;

  @ApiProperty({
    example: true,
    description: 'fix_wc of the ResidenceWcBathroom',
  })
  readonly fix_wc: boolean;

  @ApiProperty({
    example: true,
    description: 'portable_wc of the ResidenceWcBathroom',
  })
  readonly portable_wc: boolean;

  @ApiProperty({
    example: true,
    description: 'shower of the ResidenceWcBathroom',
  })
  readonly shower: boolean;

  @ApiProperty({
    example: true,
    description: 'jacuzzi of the ResidenceWcBathroom',
  })
  readonly jacuzzi: boolean;

  @ApiProperty({
    example: true,
    description: 'bathtub of the ResidenceWcBathroom',
  })
  readonly bathtub: boolean;

  @ApiProperty({
    example: true,
    description: 'soap of the ResidenceWcBathroom',
  })
  readonly soap: boolean;

  @ApiProperty({
    example: true,
    description: 'shampoo of the ResidenceWcBathroom',
  })
  readonly shampoo: boolean;

  @ApiProperty({
    example: true,
    description: 'shared_wc_bathroom of the ResidenceWcBathroom',
  })
  readonly shared_wc_bathroom: boolean;
}

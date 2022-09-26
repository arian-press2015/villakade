import { ApiProperty } from '@nestjs/swagger';

export class ResidenceServe {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceServe',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'plate of the ResidenceServe',
  })
  readonly plate: boolean;

  @ApiProperty({
    example: true,
    description: 'fork_spoon of the ResidenceServe',
  })
  readonly fork_spoon: boolean;

  @ApiProperty({
    example: true,
    description: 'knife of the ResidenceServe',
  })
  readonly knife: boolean;

  @ApiProperty({
    example: true,
    description: 'bowl of the ResidenceServe',
  })
  readonly bowl: boolean;

  @ApiProperty({
    example: true,
    description: 'glass of the ResidenceServe',
  })
  readonly glass: boolean;

  @ApiProperty({
    example: true,
    description: 'teapot of the ResidenceServe',
  })
  readonly teapot: boolean;

  @ApiProperty({
    example: true,
    description: 'kettle of the ResidenceServe',
  })
  readonly kettle: boolean;

  @ApiProperty({
    example: true,
    description: 'samovar of the ResidenceServe',
  })
  readonly samovar: boolean;

  @ApiProperty({
    example: true,
    description: 'tea_maker of the ResidenceServe',
  })
  readonly tea_maker: boolean;

  @ApiProperty({
    example: true,
    description: 'salt_shaker of the ResidenceServe',
  })
  readonly salt_shaker: boolean;

  @ApiProperty({
    example: true,
    description: 'tablecloth of the ResidenceServe',
  })
  readonly tablecloth: boolean;

  @ApiProperty({
    example: true,
    description: 'dining_table of the ResidenceServe',
  })
  readonly dining_table: boolean;

  @ApiProperty({
    example: true,
    description: 'child_chair of the ResidenceServe',
  })
  readonly child_chair: boolean;

  @ApiProperty({
    example: true,
    description: 'tissue_paper of the ResidenceServe',
  })
  readonly tissue_paper: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceServeDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceServe',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'plate is required' })
  @IsBoolean({ message: 'plate must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'plate of the ResidenceServe',
  })
  readonly plate: boolean;

  @IsNotEmpty({ message: 'fork_spoon is required' })
  @IsBoolean({ message: 'fork_spoon must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'fork_spoon of the ResidenceServe',
  })
  readonly fork_spoon: boolean;

  @IsNotEmpty({ message: 'knife is required' })
  @IsBoolean({ message: 'knife must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'knife of the ResidenceServe',
  })
  readonly knife: boolean;

  @IsNotEmpty({ message: 'bowl is required' })
  @IsBoolean({ message: 'bowl must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'bowl of the ResidenceServe',
  })
  readonly bowl: boolean;

  @IsNotEmpty({ message: 'glass is required' })
  @IsBoolean({ message: 'glass must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'glass of the ResidenceServe',
  })
  readonly glass: boolean;

  @IsNotEmpty({ message: 'teapot is required' })
  @IsBoolean({ message: 'teapot must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'teapot of the ResidenceServe',
  })
  readonly teapot: boolean;

  @IsNotEmpty({ message: 'kettle is required' })
  @IsBoolean({ message: 'kettle must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'kettle of the ResidenceServe',
  })
  readonly kettle: boolean;

  @IsNotEmpty({ message: 'samovar is required' })
  @IsBoolean({ message: 'samovar must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'samovar of the ResidenceServe',
  })
  readonly samovar: boolean;

  @IsNotEmpty({ message: 'tea_maker is required' })
  @IsBoolean({ message: 'tea_maker must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'tea_maker of the ResidenceServe',
  })
  readonly tea_maker: boolean;

  @IsNotEmpty({ message: 'salt_shaker is required' })
  @IsBoolean({ message: 'salt_shaker must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'salt_shaker of the ResidenceServe',
  })
  readonly salt_shaker: boolean;

  @IsNotEmpty({ message: 'tablecloth is required' })
  @IsBoolean({ message: 'tablecloth must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'tablecloth of the ResidenceServe',
  })
  readonly tablecloth: boolean;

  @IsNotEmpty({ message: 'dining_table is required' })
  @IsBoolean({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'dining_table of the ResidenceServe',
  })
  readonly dining_table: boolean;

  @IsNotEmpty({ message: 'child_chair is required' })
  @IsBoolean({ message: 'child_chair must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'child_chair of the ResidenceServe',
  })
  readonly child_chair: boolean;

  @IsNotEmpty({ message: 'tissue_paper is required' })
  @IsBoolean({ message: 'tissue_paper must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'tissue_paper of the ResidenceServe',
  })
  readonly tissue_paper: boolean;
}

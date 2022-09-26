import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceServeDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceServe',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'plate must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'plate of the ResidenceServe',
  })
  readonly plate?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'fork_spoon must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fork_spoon of the ResidenceServe',
  })
  readonly fork_spoon?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'knife must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'knife of the ResidenceServe',
  })
  readonly knife?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'bowl must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'bowl of the ResidenceServe',
  })
  readonly bowl?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'glass must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'glass of the ResidenceServe',
  })
  readonly glass?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'teapot must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'teapot of the ResidenceServe',
  })
  readonly teapot?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'kettle must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'kettle of the ResidenceServe',
  })
  readonly kettle?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'samovar must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'samovar of the ResidenceServe',
  })
  readonly samovar?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tea_maker must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tea_maker of the ResidenceServe',
  })
  readonly tea_maker?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'salt_shaker must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'salt_shaker of the ResidenceServe',
  })
  readonly salt_shaker?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tablecloth must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tablecloth of the ResidenceServe',
  })
  readonly tablecloth?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'dining_table of the ResidenceServe',
  })
  readonly dining_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'child_chair must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'child_chair of the ResidenceServe',
  })
  readonly child_chair?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tissue_paper must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tissue_paper of the ResidenceServe',
  })
  readonly tissue_paper?: boolean;
}

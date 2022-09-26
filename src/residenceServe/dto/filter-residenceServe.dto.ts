import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceServeDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @ApiProperty({
    required: false,
    example: 'field1:asc,field2:desc',
    description: 'sort of the residence',
  })
  readonly sort?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceServe',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'plate must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'plate of the ResidenceServe',
  })
  readonly plate?: string;

  @IsOptional()
  @IsBooleanString({ message: 'fork_spoon must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fork_spoon of the ResidenceServe',
  })
  readonly fork_spoon?: string;

  @IsOptional()
  @IsBooleanString({ message: 'knife must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'knife of the ResidenceServe',
  })
  readonly knife?: string;

  @IsOptional()
  @IsBooleanString({ message: 'bowl must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'bowl of the ResidenceServe',
  })
  readonly bowl?: string;

  @IsOptional()
  @IsBooleanString({ message: 'glass must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'glass of the ResidenceServe',
  })
  readonly glass?: string;

  @IsOptional()
  @IsBooleanString({ message: 'teapot must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'teapot of the ResidenceServe',
  })
  readonly teapot?: string;

  @IsOptional()
  @IsBooleanString({ message: 'kettle must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'kettle of the ResidenceServe',
  })
  readonly kettle?: string;

  @IsOptional()
  @IsBooleanString({ message: 'samovar must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'samovar of the ResidenceServe',
  })
  readonly samovar?: string;

  @IsOptional()
  @IsBooleanString({ message: 'tea_maker must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tea_maker of the ResidenceServe',
  })
  readonly tea_maker?: string;

  @IsOptional()
  @IsBooleanString({ message: 'salt_shaker must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'salt_shaker of the ResidenceServe',
  })
  readonly salt_shaker?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'tablecloth must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tablecloth of the ResidenceServe',
  })
  readonly tablecloth?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'dining_table of the ResidenceServe',
  })
  readonly dining_table?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'child_chair must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'child_chair of the ResidenceServe',
  })
  readonly child_chair?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'tissue_paper must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tissue_paper of the ResidenceServe',
  })
  readonly tissue_paper?: boolean;
}

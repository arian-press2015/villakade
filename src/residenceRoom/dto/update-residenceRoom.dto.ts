import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceRoomDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceRoom',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'count must be a number' })
  @ApiProperty({
    required: false,
    example: 2,
    description: 'count of the ResidenceRoom',
  })
  readonly count?: number;

  @IsOptional()
  @IsBoolean({ message: 'wall_closet must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'wall_closet of the ResidenceRoom',
  })
  readonly wall_closet?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'drawer must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'drawer of the ResidenceRoom',
  })
  readonly drawer?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'hanger must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'hanger of the ResidenceRoom',
  })
  readonly hanger?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'double_bed must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'double_bed of the ResidenceRoom',
  })
  readonly double_bed?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'single_bed must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'single_bed of the ResidenceRoom',
  })
  readonly single_bed?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'carpet must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'carpet of the ResidenceRoom',
  })
  readonly carpet?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'heating_system must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'heating_system of the ResidenceRoom',
  })
  readonly heating_system?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'cooling_system must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'cooling_system of the ResidenceRoom',
  })
  readonly cooling_system?: boolean;

  @IsOptional()
  @IsBoolean({ message: ' must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: ' of the ResidenceRoom',
  })
  readonly?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tablecloth must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tablecloth of the ResidenceRoom',
  })
  readonly tablecloth?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'dining_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'dining_table of the ResidenceRoom',
  })
  readonly dining_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'child_chair must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'child_chair of the ResidenceRoom',
  })
  readonly child_chair?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'tissue_paper must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'tissue_paper of the ResidenceRoom',
  })
  readonly tissue_paper?: boolean;
}

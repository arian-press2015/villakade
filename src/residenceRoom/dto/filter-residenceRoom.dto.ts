import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceRoomDto {
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
    example: '12345',
    description: 'residence_id of the ResidenceRoom',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'count must be a number' })
  @ApiProperty({
    required: false,
    example: '123',
    description: 'count of the ResidenceRoom',
  })
  readonly min_count?: string;

  @IsOptional()
  @IsBooleanString({ message: 'count must be a number' })
  @ApiProperty({
    required: false,
    example: '123',
    description: 'count of the ResidenceRoom',
  })
  readonly max_count?: string;

  @IsOptional()
  @IsBooleanString({ message: 'wall_closet must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'wall_closet of the ResidenceRoom',
  })
  readonly wall_closet?: string;

  @IsOptional()
  @IsBooleanString({ message: 'drawer must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'drawer of the ResidenceRoom',
  })
  readonly drawer?: string;

  @IsOptional()
  @IsBooleanString({ message: 'hanger must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'hanger of the ResidenceRoom',
  })
  readonly hanger?: string;

  @IsOptional()
  @IsBooleanString({ message: 'double_bed must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'double_bed of the ResidenceRoom',
  })
  readonly double_bed?: string;

  @IsOptional()
  @IsBooleanString({ message: 'single_bed must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'single_bed of the ResidenceRoom',
  })
  readonly single_bed?: string;

  @IsOptional()
  @IsBooleanString({ message: 'carpet must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'carpet of the ResidenceRoom',
  })
  readonly carpet?: string;

  @IsOptional()
  @IsBooleanString({ message: 'heating_system must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'heating_system of the ResidenceRoom',
  })
  readonly heating_system?: string;

  @IsOptional()
  @IsBooleanString({ message: 'cooling_system must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'cooling_system of the ResidenceRoom',
  })
  readonly cooling_system?: string;
}

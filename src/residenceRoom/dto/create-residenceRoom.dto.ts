import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceRoomDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceRoom',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'count is required' })
  @IsBoolean({ message: 'count must be a number' })
  @ApiProperty({
    example: 2,
    description: 'count of the ResidenceRoom',
  })
  readonly count: number;

  @IsNotEmpty({ message: 'wall_closet is required' })
  @IsBoolean({ message: 'wall_closet must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'wall_closet of the ResidenceRoom',
  })
  readonly wall_closet: boolean;

  @IsNotEmpty({ message: 'drawer is required' })
  @IsBoolean({ message: 'drawer must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'drawer of the ResidenceRoom',
  })
  readonly drawer: boolean;

  @IsNotEmpty({ message: 'hanger is required' })
  @IsBoolean({ message: 'hanger must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'hanger of the ResidenceRoom',
  })
  readonly hanger: boolean;

  @IsNotEmpty({ message: 'double_bed is required' })
  @IsBoolean({ message: 'double_bed must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'double_bed of the ResidenceRoom',
  })
  readonly double_bed: boolean;

  @IsNotEmpty({ message: 'single_bed is required' })
  @IsBoolean({ message: 'single_bed must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'single_bed of the ResidenceRoom',
  })
  readonly single_bed: boolean;

  @IsNotEmpty({ message: 'carpet is required' })
  @IsBoolean({ message: 'carpet must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'carpet of the ResidenceRoom',
  })
  readonly carpet: boolean;

  @IsNotEmpty({ message: 'heating_system is required' })
  @IsBoolean({ message: 'heating_system must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'heating_system of the ResidenceRoom',
  })
  readonly heating_system: boolean;

  @IsNotEmpty({ message: 'cooling_system is required' })
  @IsBoolean({ message: 'cooling_system must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'cooling_system of the ResidenceRoom',
  })
  readonly cooling_system: boolean;
}

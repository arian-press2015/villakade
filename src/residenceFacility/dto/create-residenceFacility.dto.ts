import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceFacilityDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceFacility',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'furniture is required' })
  @IsBoolean({ message: 'furniture must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'furniture of the ResidenceFacility',
  })
  readonly furniture: boolean;

  @IsNotEmpty({ message: 'vacuum_cleaner is required' })
  @IsBoolean({ message: 'vacuum_cleaner must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'vacuum_cleaner of the ResidenceFacility',
  })
  readonly vacuum_cleaner: boolean;

  @IsNotEmpty({ message: 'washing_machine is required' })
  @IsBoolean({ message: 'washing_machine must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'washing_machine of the ResidenceFacility',
  })
  readonly washing_machine: boolean;

  @IsNotEmpty({ message: 'washing_powder is required' })
  @IsBoolean({ message: 'washing_powder must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'washing_powder of the ResidenceFacility',
  })
  readonly washing_powder: boolean;

  @IsNotEmpty({ message: 'dishwashing_machine is required' })
  @IsBoolean({ message: 'dishwashing_machine must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'dishwashing_machine of the ResidenceFacility',
  })
  readonly dishwashing_machine: boolean;

  @IsNotEmpty({ message: 'wifi is required' })
  @IsBoolean({ message: 'wifi must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'wifi of the ResidenceFacility',
  })
  readonly wifi: boolean;

  @IsNotEmpty({ message: 'hairdryer is required' })
  @IsBoolean({ message: 'hairdryer must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'hairdryer of the ResidenceFacility',
  })
  readonly hairdryer: boolean;

  @IsNotEmpty({ message: 'elevator is required' })
  @IsBoolean({ message: 'elevator must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'elevator of the ResidenceFacility',
  })
  readonly elevator: boolean;

  @IsNotEmpty({ message: 'iron is required' })
  @IsBoolean({ message: 'iron must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'iron of the ResidenceFacility',
  })
  readonly iron: boolean;

  @IsNotEmpty({ message: 'telephone is required' })
  @IsBoolean({ message: 'telephone must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'telephone of the ResidenceFacility',
  })
  readonly telephone: boolean;

  @IsNotEmpty({ message: 'first_aid_kit is required' })
  @IsBoolean({ message: 'first_aid_kit must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'first_aid_kit of the ResidenceFacility',
  })
  readonly first_aid_kit: boolean;

  @IsNotEmpty({ message: 'security_camera is required' })
  @IsBoolean({ message: 'security_camera must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'security_camera of the ResidenceFacility',
  })
  readonly security_camera: boolean;
}

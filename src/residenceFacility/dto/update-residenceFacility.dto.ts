import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceFacilityDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceFacility',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'furniture must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'furniture of the ResidenceFacility',
  })
  readonly furniture?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'vacuum_cleaner must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'vacuum_cleaner of the ResidenceFacility',
  })
  readonly vacuum_cleaner?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'washing_machine must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'washing_machine of the ResidenceFacility',
  })
  readonly washing_machine?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'washing_powder must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'washing_powder of the ResidenceFacility',
  })
  readonly washing_powder?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'dishwashing_machine must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'dishwashing_machine of the ResidenceFacility',
  })
  readonly dishwashing_machine?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'wifi must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'wifi of the ResidenceFacility',
  })
  readonly wifi?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'hairdryer must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'hairdryer of the ResidenceFacility',
  })
  readonly hairdryer?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'elevator must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'elevator of the ResidenceFacility',
  })
  readonly elevator?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'iron must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'iron of the ResidenceFacility',
  })
  readonly iron?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'telephone must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'telephone of the ResidenceFacility',
  })
  readonly telephone?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'first_aid_kit must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'first_aid_kit of the ResidenceFacility',
  })
  readonly first_aid_kit?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'security_camera must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'security_camera of the ResidenceFacility',
  })
  readonly security_camera?: boolean;
}

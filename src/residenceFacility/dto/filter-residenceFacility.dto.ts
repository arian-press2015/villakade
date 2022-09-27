import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceFacilityDto {
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
    description: 'residence_id of the ResidenceFacility',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'furniture must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'furniture of the ResidenceFacility',
  })
  readonly furniture?: string;

  @IsOptional()
  @IsBooleanString({ message: 'vacuum_cleaner must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'vacuum_cleaner of the ResidenceFacility',
  })
  readonly vacuum_cleaner?: string;

  @IsOptional()
  @IsBooleanString({ message: 'washing_machine must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'washing_machine of the ResidenceFacility',
  })
  readonly washing_machine?: string;

  @IsOptional()
  @IsBooleanString({ message: 'washing_powder must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'washing_powder of the ResidenceFacility',
  })
  readonly washing_powder?: string;

  @IsOptional()
  @IsBooleanString({ message: 'dishwashing_machine must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'dishwashing_machine of the ResidenceFacility',
  })
  readonly dishwashing_machine?: string;

  @IsOptional()
  @IsBooleanString({ message: 'wifi must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'wifi of the ResidenceFacility',
  })
  readonly wifi?: string;

  @IsOptional()
  @IsBooleanString({ message: 'hairdryer must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'hairdryer of the ResidenceFacility',
  })
  readonly hairdryer?: string;

  @IsOptional()
  @IsBooleanString({ message: 'elevator must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'elevator of the ResidenceFacility',
  })
  readonly elevator?: string;

  @IsOptional()
  @IsBooleanString({ message: 'iron must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'iron of the ResidenceFacility',
  })
  readonly iron?: string;

  @IsOptional()
  @IsBooleanString({ message: 'telephone must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'telephone of the ResidenceFacility',
  })
  readonly telephone?: string;

  @IsOptional()
  @IsBooleanString({ message: 'first_aid_kit must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'first_aid_kit of the ResidenceFacility',
  })
  readonly first_aid_kit?: string;

  @IsOptional()
  @IsBooleanString({ message: 'security_camera must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'security_camera of the ResidenceFacility',
  })
  readonly security_camera?: string;
}

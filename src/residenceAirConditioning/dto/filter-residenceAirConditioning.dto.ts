import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceAirConditioningDto {
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
    description: 'residence_id of the ResidenceAirConditioning',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'radiator must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'radiator of the ResidenceAirConditioning',
  })
  readonly radiator?: string;

  @IsOptional()
  @IsBooleanString({ message: 'wood_heater must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'wood_heater of the ResidenceAirConditioning',
  })
  readonly wood_heater?: string;

  @IsOptional()
  @IsBooleanString({ message: 'fireplace must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fireplace of the ResidenceAirConditioning',
  })
  readonly fireplace?: string;

  @IsOptional()
  @IsBooleanString({ message: 'korsi must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'korsi of the ResidenceAirConditioning',
  })
  readonly korsi?: string;

  @IsOptional()
  @IsBooleanString({ message: 'oil_heater must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'oil_heater of the ResidenceAirConditioning',
  })
  readonly oil_heater?: string;

  @IsOptional()
  @IsBooleanString({ message: 'fancoil must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fancoil of the ResidenceAirConditioning',
  })
  readonly fancoil?: string;

  @IsOptional()
  @IsBooleanString({ message: 'electric_heater must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'electric_heater of the ResidenceAirConditioning',
  })
  readonly electric_heater?: string;

  @IsOptional()
  @IsBooleanString({ message: 'air_conditioner must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'air_conditioner of the ResidenceAirConditioning',
  })
  readonly air_conditioner?: string;

  @IsOptional()
  @IsBooleanString({ message: 'water_cooler must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'water_cooler of the ResidenceAirConditioning',
  })
  readonly water_cooler?: string;

  @IsOptional()
  @IsBooleanString({ message: 'split must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'split of the ResidenceAirConditioning',
  })
  readonly split?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'ceiling_fan must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'ceiling_fan of the ResidenceAirConditioning',
  })
  readonly ceiling_fan?: boolean;

  @IsOptional()
  @IsBooleanString({ message: 'standing_fan must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'standing_fan of the ResidenceAirConditioning',
  })
  readonly standing_fan?: string;
}

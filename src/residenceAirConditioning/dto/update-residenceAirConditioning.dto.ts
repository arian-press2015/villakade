import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceAirConditioningDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceAirConditioning',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'radiator must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'radiator of the ResidenceAirConditioning',
  })
  readonly radiator?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'wood_heater must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'wood_heater of the ResidenceAirConditioning',
  })
  readonly wood_heater?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'fireplace must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fireplace of the ResidenceAirConditioning',
  })
  readonly fireplace?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'korsi must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'korsi of the ResidenceAirConditioning',
  })
  readonly korsi?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'oil_heater must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'oil_heater of the ResidenceAirConditioning',
  })
  readonly oil_heater?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'fancoil must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fancoil of the ResidenceAirConditioning',
  })
  readonly fancoil?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'electric_heater must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'electric_heater of the ResidenceAirConditioning',
  })
  readonly electric_heater?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'air_conditioner must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'air_conditioner of the ResidenceAirConditioning',
  })
  readonly air_conditioner?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'water_cooler must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'water_cooler of the ResidenceAirConditioning',
  })
  readonly water_cooler?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'split must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'split of the ResidenceAirConditioning',
  })
  readonly split?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'ceiling_fan must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'ceiling_fan of the ResidenceAirConditioning',
  })
  readonly ceiling_fan?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'standing_fan must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'standing_fan of the ResidenceAirConditioning',
  })
  readonly standing_fan?: boolean;
}

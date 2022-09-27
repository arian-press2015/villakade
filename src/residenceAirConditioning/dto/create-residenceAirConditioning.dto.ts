import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceAirConditioningDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceAirConditioning',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'radiator is required' })
  @IsBoolean({ message: 'radiator must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'radiator of the ResidenceAirConditioning',
  })
  readonly radiator: boolean;

  @IsNotEmpty({ message: 'wood_heater is required' })
  @IsBoolean({ message: 'wood_heater must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'wood_heater of the ResidenceAirConditioning',
  })
  readonly wood_heater: boolean;

  @IsNotEmpty({ message: 'fireplace is required' })
  @IsBoolean({ message: 'fireplace must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'fireplace of the ResidenceAirConditioning',
  })
  readonly fireplace: boolean;

  @IsNotEmpty({ message: 'korsi is required' })
  @IsBoolean({ message: 'korsi must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'korsi of the ResidenceAirConditioning',
  })
  readonly korsi: boolean;

  @IsNotEmpty({ message: 'oil_heater is required' })
  @IsBoolean({ message: 'oil_heater must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'oil_heater of the ResidenceAirConditioning',
  })
  readonly oil_heater: boolean;

  @IsNotEmpty({ message: 'fancoil is required' })
  @IsBoolean({ message: 'fancoil must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'fancoil of the ResidenceAirConditioning',
  })
  readonly fancoil: boolean;

  @IsNotEmpty({ message: 'electric_heater is required' })
  @IsBoolean({ message: 'electric_heater must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'electric_heater of the ResidenceAirConditioning',
  })
  readonly electric_heater: boolean;

  @IsNotEmpty({ message: 'air_conditioner is required' })
  @IsBoolean({ message: 'air_conditioner must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'air_conditioner of the ResidenceAirConditioning',
  })
  readonly air_conditioner: boolean;

  @IsNotEmpty({ message: 'water_cooler is required' })
  @IsBoolean({ message: 'water_cooler must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'water_cooler of the ResidenceAirConditioning',
  })
  readonly water_cooler: boolean;

  @IsNotEmpty({ message: 'split is required' })
  @IsBoolean({ message: 'split must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'split of the ResidenceAirConditioning',
  })
  readonly split: boolean;

  @IsNotEmpty({ message: 'ceiling_fan is required' })
  @IsBoolean({ message: 'ceiling_fan must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'ceiling_fan of the ResidenceAirConditioning',
  })
  readonly ceiling_fan: boolean;

  @IsNotEmpty({ message: 'standing_fan is required' })
  @IsBoolean({ message: 'standing_fan must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'standing_fan of the ResidenceAirConditioning',
  })
  readonly standing_fan: boolean;
}

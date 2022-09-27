import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class UpdateResidenceEntertainmentDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceEntertainment',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsBoolean({ message: 'television must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'television of the ResidenceEntertainment',
  })
  readonly television?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'receiver must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'receiver of the ResidenceEntertainment',
  })
  readonly receiver?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'audio_system must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'audio_system of the ResidenceEntertainment',
  })
  readonly audio_system?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'swing must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'swing of the ResidenceEntertainment',
  })
  readonly swing?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'ping_pong must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'ping_pong of the ResidenceEntertainment',
  })
  readonly ping_pong?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'foosball must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'foosball of the ResidenceEntertainment',
  })
  readonly foosball?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'game_console must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'game_console of the ResidenceEntertainment',
  })
  readonly game_console?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'pool_table must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'pool_table of the ResidenceEntertainment',
  })
  readonly pool_table?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'game_board must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'game_board of the ResidenceEntertainment',
  })
  readonly game_board?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'treadmill must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'treadmill of the ResidenceEntertainment',
  })
  readonly treadmill?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'bicycle must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'bicycle of the ResidenceEntertainment',
  })
  readonly bicycle?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'beach_motor must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'beach_motor of the ResidenceEntertainment',
  })
  readonly beach_motor?: boolean;
}

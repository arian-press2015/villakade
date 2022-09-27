import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateResidenceEntertainmentDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceEntertainment',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'television is required' })
  @IsBoolean({ message: 'television must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'television of the ResidenceEntertainment',
  })
  readonly television: boolean;

  @IsNotEmpty({ message: 'receiver is required' })
  @IsBoolean({ message: 'receiver must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'receiver of the ResidenceEntertainment',
  })
  readonly receiver: boolean;

  @IsNotEmpty({ message: 'audio_system is required' })
  @IsBoolean({ message: 'audio_system must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'audio_system of the ResidenceEntertainment',
  })
  readonly audio_system: boolean;

  @IsNotEmpty({ message: 'swing is required' })
  @IsBoolean({ message: 'swing must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'swing of the ResidenceEntertainment',
  })
  readonly swing: boolean;

  @IsNotEmpty({ message: 'ping_pong is required' })
  @IsBoolean({ message: 'ping_pong must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'ping_pong of the ResidenceEntertainment',
  })
  readonly ping_pong: boolean;

  @IsNotEmpty({ message: 'foosball is required' })
  @IsBoolean({ message: 'foosball must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'foosball of the ResidenceEntertainment',
  })
  readonly foosball: boolean;

  @IsNotEmpty({ message: 'game_console is required' })
  @IsBoolean({ message: 'game_console must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'game_console of the ResidenceEntertainment',
  })
  readonly game_console: boolean;

  @IsNotEmpty({ message: 'pool_table is required' })
  @IsBoolean({ message: 'pool_table must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'pool_table of the ResidenceEntertainment',
  })
  readonly pool_table: boolean;

  @IsNotEmpty({ message: 'game_board is required' })
  @IsBoolean({ message: 'game_board must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'game_board of the ResidenceEntertainment',
  })
  readonly game_board: boolean;

  @IsNotEmpty({ message: 'treadmill is required' })
  @IsBoolean({ message: 'treadmill must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'treadmill of the ResidenceEntertainment',
  })
  readonly treadmill: boolean;

  @IsNotEmpty({ message: 'bicycle is required' })
  @IsBoolean({ message: 'bicycle must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'bicycle of the ResidenceEntertainment',
  })
  readonly bicycle: boolean;

  @IsNotEmpty({ message: 'beach_motor is required' })
  @IsBoolean({ message: 'beach_motor must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'beach_motor of the ResidenceEntertainment',
  })
  readonly beach_motor: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class ResidenceEntertainment {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceEntertainment',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: true,
    description: 'television of the ResidenceEntertainment',
  })
  readonly television: boolean;

  @ApiProperty({
    example: true,
    description: 'receiver of the ResidenceEntertainment',
  })
  readonly receiver: boolean;

  @ApiProperty({
    example: true,
    description: 'audio_system of the ResidenceEntertainment',
  })
  readonly audio_system: boolean;

  @ApiProperty({
    example: true,
    description: 'swing of the ResidenceEntertainment',
  })
  readonly swing: boolean;

  @ApiProperty({
    example: true,
    description: 'ping_pong of the ResidenceEntertainment',
  })
  readonly ping_pong: boolean;

  @ApiProperty({
    example: true,
    description: 'foosball of the ResidenceEntertainment',
  })
  readonly foosball: boolean;

  @ApiProperty({
    example: true,
    description: 'game_console of the ResidenceEntertainment',
  })
  readonly game_console: boolean;

  @ApiProperty({
    example: true,
    description: 'pool_table of the ResidenceEntertainment',
  })
  readonly pool_table: boolean;

  @ApiProperty({
    example: true,
    description: 'game_board of the ResidenceEntertainment',
  })
  readonly game_board: boolean;

  @ApiProperty({
    example: true,
    description: 'treadmill of the ResidenceEntertainment',
  })
  readonly treadmill: boolean;

  @ApiProperty({
    example: true,
    description: 'bicycle of the ResidenceEntertainment',
  })
  readonly bicycle: boolean;

  @ApiProperty({
    example: true,
    description: 'beach_motor of the ResidenceEntertainment',
  })
  readonly beach_motor: boolean;
}

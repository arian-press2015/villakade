import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceEntertainmentDto {
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
    description: 'residence_id of the ResidenceEntertainment',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsBooleanString({ message: 'television must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'television of the ResidenceEntertainment',
  })
  readonly television?: string;

  @IsOptional()
  @IsBooleanString({ message: 'receiver must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'receiver of the ResidenceEntertainment',
  })
  readonly receiver?: string;

  @IsOptional()
  @IsBooleanString({ message: 'audio_system must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'audio_system of the ResidenceEntertainment',
  })
  readonly audio_system?: string;

  @IsOptional()
  @IsBooleanString({ message: 'swing must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'swing of the ResidenceEntertainment',
  })
  readonly swing?: string;

  @IsOptional()
  @IsBooleanString({ message: 'ping_pong must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'ping_pong of the ResidenceEntertainment',
  })
  readonly ping_pong?: string;

  @IsOptional()
  @IsBooleanString({ message: 'foosball must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'foosball of the ResidenceEntertainment',
  })
  readonly foosball?: string;

  @IsOptional()
  @IsBooleanString({ message: 'game_console must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'game_console of the ResidenceEntertainment',
  })
  readonly game_console?: string;

  @IsOptional()
  @IsBooleanString({ message: 'pool_table must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'pool_table of the ResidenceEntertainment',
  })
  readonly pool_table?: string;

  @IsOptional()
  @IsBooleanString({ message: 'game_board must be a string' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'game_board of the ResidenceEntertainment',
  })
  readonly game_board?: string;

  @IsOptional()
  @IsBooleanString({ message: 'treadmill must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'treadmill of the ResidenceEntertainment',
  })
  readonly treadmill?: string;

  @IsOptional()
  @IsBooleanString({ message: 'bicycle must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'bicycle of the ResidenceEntertainment',
  })
  readonly bicycle?: string;

  @IsOptional()
  @IsBooleanString({ message: 'beach_motor must be a boolean' })
  @ApiProperty({
    required: false,
    example: 'true',
    description: 'beach_motor of the ResidenceEntertainment',
  })
  readonly beach_motor?: string;
}

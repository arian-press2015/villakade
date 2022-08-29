import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterOwnerDto {
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
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'arian',
    description: 'first_name of the Owner',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString({ message: 'last_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'press2015',
    description: 'last_name of the Owner',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    required: false,
    example: '+989012883045',
    description: 'phone of the Owner',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'username must be a string' })
  @ApiProperty({
    required: false,
    example: 'AP2015',
    description: 'username of the Owner',
  })
  readonly username?: string;

  @IsOptional()
  @IsNumberString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: '12345',
    description: 'role of the Owner',
  })
  readonly role_id?: string;
}

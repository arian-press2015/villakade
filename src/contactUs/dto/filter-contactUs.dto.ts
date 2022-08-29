import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterContactUsDto {
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
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'arian.press2015@gmail.com',
    description: 'email of the ContactUs',
  })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    required: false,
    example: 'ساحلی و رو به دریا',
    description: 'phone of the ContactUs',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'full_name must be a string' })
  @ApiProperty({
    required: false,
    example: 'AP2015',
    description: 'full_name of the ContactUs',
  })
  readonly full_name?: string;

  @IsOptional()
  @IsString({ message: 'description must be a string' })
  @ApiProperty({
    required: false,
    example: 'Help me get a villa',
    description: 'description of the ContactUs',
  })
  readonly description?: string;
}

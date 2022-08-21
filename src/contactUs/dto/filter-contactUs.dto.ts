import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterContactUsDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'arian.press2015@gmail.com',
    description: 'email of the ContactUs',
  })
  readonly email?: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'phone of the ContactUs',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'Full_name must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the ContactUs',
  })
  readonly full_name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @ApiProperty({
    example: 'Help me get a villa',
    description: 'description of the ContactUs',
  })
  readonly description?: string;
}

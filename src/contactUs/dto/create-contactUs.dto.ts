import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactUsDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    example: 'arian.press2015@gmail.com',
    description: 'email of the ContactUs',
  })
  readonly email: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: 'ساحلی و رو به دریا',
    description: 'phone of the ContactUs',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'full_name is required' })
  @IsString({ message: 'full_name must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the ContactUs',
  })
  readonly full_name: string;

  @IsNotEmpty({ message: 'description is required' })
  @IsString({ message: 'description must be a string' })
  @ApiProperty({
    example: 'Help me get a villa',
    description: 'description of the ContactUs',
  })
  readonly description: string;
}

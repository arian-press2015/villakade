import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportDto {
  @IsNotEmpty({ message: 'full_name is required' })
  @IsString({ message: 'full_name must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the Support',
  })
  readonly full_name: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Support',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'activation status is required' })
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activation status of the Support',
  })
  readonly active: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateSupportDto {
  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'full_name of the Support',
  })
  readonly full_name: string;

  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Support',
  })
  readonly phone: string;

  @IsBoolean({ message: 'active must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'activation status of the Support',
  })
  readonly active: boolean;
}

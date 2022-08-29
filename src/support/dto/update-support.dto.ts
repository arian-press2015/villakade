import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSupportDto {
  @IsOptional()
  @IsString({ message: 'title must be a string' })
  @ApiProperty({
    required: false,
    example: 'AP2015',
    description: 'full_name of the Support',
  })
  readonly full_name?: string;

  @IsOptional()
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    required: false,
    example: '+989012883045',
    description: 'phone of the Support',
  })
  readonly phone?: string;

  @IsOptional()
  @IsBoolean({ message: 'activation status must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'activation status of the Support',
  })
  readonly active?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterResidenceImageDto {
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
    example: '12345',
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id?: string;
}

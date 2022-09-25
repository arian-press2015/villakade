import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterResidenceRuleDto {
  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceRule',
  })
  readonly residence_id?: string;

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
  @IsString({ message: 'in_time must be a string' })
  @ApiProperty({
    required: false,
    example: '14:00:00',
    description: 'in_time of the ResidenceRule',
  })
  readonly in_time?: string;

  @IsOptional()
  @IsString({ message: 'out_time must be a string' })
  @ApiProperty({
    required: false,
    example: '10:00:00',
    description: 'out_time of the ResidenceRule',
  })
  readonly out_time?: string;

  @IsOptional()
  @IsString({ message: 'required_documents must be a string' })
  @ApiProperty({
    required: false,
    example: 'شناسنامه یا کارت ملی',
    description: 'required_documents of the ResidenceRule',
  })
  readonly required_documents?: string;

  @IsOptional()
  @IsString({ message: 'pet_status must be a string' })
  @ApiProperty({
    required: false,
    enum: ['yes', 'yes_outside', 'yes_in_box', 'no'],
    example: 'no',
    description: 'pet_status of the ResidenceRule',
  })
  readonly pet_status?: string;

  @IsOptional()
  @IsString({ message: 'ceremonies must be a string' })
  @ApiProperty({
    required: false,
    enum: ['yes', 'yes_by_coordination', 'no'],
    example: 'no',
    description: 'ceremonies of the ResidenceRule',
  })
  readonly ceremonies?: string;
}

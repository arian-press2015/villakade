import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterFaqDto {
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
  @IsString({ message: 'faq_type must be a string' })
  @ApiProperty({
    required: false,
    example: 'residence',
    description: 'faq_type of the Faq',
  })
  readonly faq_type?: string;

  @IsOptional()
  @IsString({ message: 'question must be a string' })
  @ApiProperty({
    required: false,
    example: 'چطور ویلا اجاره کنیم؟',
    description: 'question of the Faq',
  })
  readonly question?: string;

  @IsOptional()
  @IsString({ message: 'answer must be a string' })
  @ApiProperty({
    required: false,
    example: 'به سادگی',
    description: 'faq_type of the Faq',
  })
  readonly answer?: string;
}

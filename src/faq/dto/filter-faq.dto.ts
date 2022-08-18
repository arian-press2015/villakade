import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterFaqDto {
  @IsOptional()
  @IsString({ message: 'Faq_type must be a string' })
  @ApiProperty({
    example: 'residence',
    description: 'faq_type of the Faq',
  })
  readonly faq_type?: string;

  @IsOptional()
  @IsString({ message: 'Question must be a string' })
  @ApiProperty({
    example: 'چطور ویلا اجاره کنیم؟',
    description: 'question of the Faq',
  })
  readonly question?: string;

  @IsOptional()
  @IsString({ message: 'Answer must be a string' })
  @ApiProperty({
    example: 'به سادگی',
    description: 'faq_type of the Faq',
  })
  readonly answer?: string;
}

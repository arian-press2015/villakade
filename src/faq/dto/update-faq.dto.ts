import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
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

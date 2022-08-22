import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty({ message: 'faq_type is required' })
  @IsString({ message: 'faq_type must be a string' })
  @ApiProperty({
    example: 'residence',
    description: 'faq_type of the Faq',
  })
  readonly faq_type: string;

  @IsNotEmpty({ message: 'question is required' })
  @IsString({ message: 'question must be a string' })
  @ApiProperty({
    example: 'چطور ویلا اجاره کنیم؟',
    description: 'question of the Faq',
  })
  readonly question: string;

  @IsNotEmpty({ message: 'answer is required' })
  @IsString({ message: 'answer must be a string' })
  @ApiProperty({
    example: 'به سادگی',
    description: 'faq_type of the Faq',
  })
  readonly answer: string;
}

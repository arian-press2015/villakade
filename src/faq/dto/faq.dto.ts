import { ApiProperty } from '@nestjs/swagger';

export class Faq {
  @ApiProperty({ example: 12345, description: 'ID of the entity in database' })
  readonly id: number;

  @ApiProperty({
    example: 'residence',
    description: 'faq_type of the Faq',
  })
  readonly faq_type: string;

  @ApiProperty({
    example: 'چطور ویلا اجاره کنیم؟',
    description: 'question of the Faq',
  })
  readonly question: string;

  @ApiProperty({
    example: 'به سادگی',
    description: 'faq_type of the Faq',
  })
  readonly answer: string;
}

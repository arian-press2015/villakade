import { ApiProperty } from '@nestjs/swagger';

export class ResidenceRule {
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceRule',
  })
  readonly residence_id: number;

  @ApiProperty({
    example: 'خونه را کثیف نکنین لطفا',
    description: 'rule_body of the ResidenceRule',
  })
  readonly rule_body: string;
}

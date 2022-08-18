import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export class CreateResidenceRuleDto {
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceRule',
  })
  readonly residence_id: number;

  @IsString({ message: 'Title must be a string' })
  @ApiProperty({
    example: 'خونه را کثیف نکنین لطفا',
    description: 'rule_body of the ResidenceRule',
  })
  readonly rule_body: string;
}

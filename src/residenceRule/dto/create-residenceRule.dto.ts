import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateResidenceRuleDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceRule',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'rule_body is required' })
  @IsString({ message: 'rule_body must be a string' })
  @ApiProperty({
    example: 'خونه را کثیف نکنین لطفا',
    description: 'rule_body of the ResidenceRule',
  })
  readonly rule_body: string;
}

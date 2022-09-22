import { ApiProperty } from '@nestjs/swagger';
import {
  residence_rule_ceremonies,
  residence_rule_pet_status,
} from '@prisma/client';

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

  @ApiProperty({
    example: '14:00:00',
    description: 'in_time of the ResidenceRule',
  })
  readonly in_time: Date;

  @ApiProperty({
    example: '10:00:00',
    description: 'out_time of the ResidenceRule',
  })
  readonly out_time: Date;

  @ApiProperty({
    example: 'شناسنامه یا کارت ملی',
    description: 'required_documents of the ResidenceRule',
  })
  readonly required_documents: string;

  @ApiProperty({
    enum: residence_rule_pet_status,
    example: 'no',
    description: 'pet_status of the ResidenceRule',
  })
  readonly pet_status: residence_rule_pet_status;

  @ApiProperty({
    enum: residence_rule_ceremonies,
    example: 'no',
    description: 'ceremonies of the ResidenceRule',
  })
  readonly ceremonies: residence_rule_ceremonies;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateResidenceRuleDto {
  @IsOptional()
  @IsString({ message: 'rule_body must be a string' })
  @ApiProperty({
    required: false,
    example: 'خونه را کثیف نکنین لطفا',
    description: 'rule_body of the ResidenceRule',
  })
  readonly rule_body?: string;

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

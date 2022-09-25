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

  @IsNotEmpty({ message: 'in_time is required' })
  @IsString({ message: 'in_time must be a string' })
  @ApiProperty({
    example: '14:00:00',
    description: 'in_time of the ResidenceRule',
  })
  readonly in_time: string;

  @IsNotEmpty({ message: 'out_time is required' })
  @IsString({ message: 'out_time must be a string' })
  @ApiProperty({
    example: '10:00:00',
    description: 'out_time of the ResidenceRule',
  })
  readonly out_time: string;

  @IsNotEmpty({ message: 'required_documents is required' })
  @IsString({ message: 'required_documents must be a string' })
  @ApiProperty({
    example: 'شناسنامه یا کارت ملی',
    description: 'required_documents of the ResidenceRule',
  })
  readonly required_documents: string;

  @IsNotEmpty({ message: 'pet_status is required' })
  @IsString({ message: 'pet_status must be a string' })
  @ApiProperty({
    enum: ['yes', 'yes_outside', 'yes_in_box', 'no'],
    example: 'no',
    description: 'pet_status of the ResidenceRule',
  })
  readonly pet_status: string;

  @IsNotEmpty({ message: 'ceremonies is required' })
  @IsString({ message: 'ceremonies must be a string' })
  @ApiProperty({
    enum: ['yes', 'yes_by_coordination', 'no'],
    example: 'no',
    description: 'ceremonies of the ResidenceRule',
  })
  readonly ceremonies: string;
}

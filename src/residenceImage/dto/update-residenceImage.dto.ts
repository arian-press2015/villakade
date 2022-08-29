import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateResidenceImageDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;
}

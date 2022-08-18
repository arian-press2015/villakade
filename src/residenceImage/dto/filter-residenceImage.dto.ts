import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FilterResidenceImageDto {
  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: '12345',
    description: 'residence_id of the ResidenceImage',
  })
  readonly residence_id: number;
}

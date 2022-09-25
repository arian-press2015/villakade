import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateResidenceWcBathroomDto {
  @IsOptional()
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceWcBathroom',
  })
  readonly residence_id?: number;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    required: false,
    example: 'خونه را کثیف نکنین لطفا',
    description: 'location of the ResidenceWcBathroom',
  })
  readonly location?: string;

  @IsOptional()
  @IsBoolean({ message: 'local_wc must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'local_wc of the ResidenceWcBathroom',
  })
  readonly local_wc?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'fix_wc must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fix_wc of the ResidenceWcBathroom',
  })
  readonly fix_wc?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'portable_wc must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'portable_wc of the ResidenceWcBathroom',
  })
  readonly portable_wc?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'shower must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shower of the ResidenceWcBathroom',
  })
  readonly shower?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'jacuzzi must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'jacuzzi of the ResidenceWcBathroom',
  })
  readonly jacuzzi?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'bathtub must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'bathtub of the ResidenceWcBathroom',
  })
  readonly bathtub?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'soap must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'soap of the ResidenceWcBathroom',
  })
  readonly soap?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'shampoo must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shampoo of the ResidenceWcBathroom',
  })
  readonly shampoo?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'shared_wc_bathroom must be a boolean' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shared_wc_bathroom of the ResidenceWcBathroom',
  })
  readonly shared_wc_bathroom?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateResidenceWcBathroomDto {
  @IsNotEmpty({ message: 'residence_id is required' })
  @IsPositive({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'residence_id of the ResidenceWcBathroom',
  })
  readonly residence_id: number;

  @IsNotEmpty({ message: 'location is required' })
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    example: 'خونه را کثیف نکنین لطفا',
    description: 'location of the ResidenceWcBathroom',
  })
  readonly location: string;

  @IsNotEmpty({ message: 'local_wc is required' })
  @IsBoolean({ message: 'local_wc must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'local_wc of the ResidenceWcBathroom',
  })
  readonly local_wc: boolean;

  @IsNotEmpty({ message: 'fix_wc is required' })
  @IsBoolean({ message: 'fix_wc must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'fix_wc of the ResidenceWcBathroom',
  })
  readonly fix_wc: boolean;

  @IsNotEmpty({ message: 'portable_wc is required' })
  @IsBoolean({ message: 'portable_wc must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'portable_wc of the ResidenceWcBathroom',
  })
  readonly portable_wc: boolean;

  @IsNotEmpty({ message: 'shower is required' })
  @IsBoolean({ message: 'shower must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'shower of the ResidenceWcBathroom',
  })
  readonly shower: boolean;

  @IsNotEmpty({ message: 'jacuzzi is required' })
  @IsBoolean({ message: 'jacuzzi must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'jacuzzi of the ResidenceWcBathroom',
  })
  readonly jacuzzi: boolean;

  @IsNotEmpty({ message: 'bathtub is required' })
  @IsBoolean({ message: 'bathtub must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'bathtub of the ResidenceWcBathroom',
  })
  readonly bathtub: boolean;

  @IsNotEmpty({ message: 'soap is required' })
  @IsBoolean({ message: 'soap must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'soap of the ResidenceWcBathroom',
  })
  readonly soap: boolean;

  @IsNotEmpty({ message: 'shampoo is required' })
  @IsBoolean({ message: 'shampoo must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'shampoo of the ResidenceWcBathroom',
  })
  readonly shampoo: boolean;

  @IsNotEmpty({ message: 'shared_wc_bathroom is required' })
  @IsBoolean({ message: 'shared_wc_bathroom must be a boolean' })
  @ApiProperty({
    example: true,
    description: 'shared_wc_bathroom of the ResidenceWcBathroom',
  })
  readonly shared_wc_bathroom: boolean;
}

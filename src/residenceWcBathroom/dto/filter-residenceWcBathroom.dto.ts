import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterResidenceWcBathroomDto {
  @IsOptional()
  @IsNumberString({ message: 'offset must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'offset of the residence',
  })
  readonly offset?: string;

  @IsOptional()
  @IsNumberString({ message: 'limit must be a positive number' })
  @ApiProperty({
    required: false,
    example: '0',
    description: 'limit of the residence',
  })
  readonly limit?: string;

  @IsOptional()
  @IsString({ message: 'sort must be a string' })
  @ApiProperty({
    required: false,
    example: 'field1:asc,field2:desc',
    description: 'sort of the residence',
  })
  readonly sort?: string;

  @IsOptional()
  @IsNumberString({ message: 'residence_id must be a positive number' })
  @ApiProperty({
    required: false,
    example: 12345,
    description: 'residence_id of the ResidenceWcBathroom',
  })
  readonly residence_id?: string;

  @IsOptional()
  @IsString({ message: 'location must be a string' })
  @ApiProperty({
    required: false,
    example: 'خونه را کثیف نکنین لطفا',
    description: 'location of the ResidenceWcBathroom',
  })
  readonly location?: string;

  @IsOptional()
  @IsBooleanString({ message: 'local_wc must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'local_wc of the ResidenceWcBathroom',
  })
  readonly local_wc?: string;

  @IsOptional()
  @IsBooleanString({ message: 'fix_wc must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'fix_wc of the ResidenceWcBathroom',
  })
  readonly fix_wc?: string;

  @IsOptional()
  @IsBooleanString({ message: 'portable_wc must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'portable_wc of the ResidenceWcBathroom',
  })
  readonly portable_wc?: string;

  @IsOptional()
  @IsBooleanString({ message: 'shower must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shower of the ResidenceWcBathroom',
  })
  readonly shower?: string;

  @IsOptional()
  @IsBooleanString({ message: 'jacuzzi must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'jacuzzi of the ResidenceWcBathroom',
  })
  readonly jacuzzi?: string;

  @IsOptional()
  @IsBooleanString({ message: 'bathtub must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'bathtub of the ResidenceWcBathroom',
  })
  readonly bathtub?: string;

  @IsOptional()
  @IsBooleanString({ message: 'soap must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'soap of the ResidenceWcBathroom',
  })
  readonly soap?: string;

  @IsOptional()
  @IsBooleanString({ message: 'shampoo must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shampoo of the ResidenceWcBathroom',
  })
  readonly shampoo?: string;

  @IsOptional()
  @IsBooleanString({ message: 'shared_wc_bathroom must be a string' })
  @ApiProperty({
    required: false,
    example: true,
    description: 'shared_wc_bathroom of the ResidenceWcBathroom',
  })
  readonly shared_wc_bathroom?: string;
}

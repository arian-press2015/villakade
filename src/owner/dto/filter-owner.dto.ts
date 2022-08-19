import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterOwnerDto {
  @IsOptional()
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Owner',
  })
  readonly first_name?: string;

  @IsOptional()
  @IsString({ message: 'Last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Owner',
  })
  readonly last_name?: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Owner',
  })
  readonly phone?: string;

  @IsOptional()
  @IsString({ message: 'username must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'username of the Owner',
  })
  readonly username?: string;

  @IsOptional()
  @IsString({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: '12345',
    description: 'role of the Owner',
  })
  readonly role_id?: string;
}

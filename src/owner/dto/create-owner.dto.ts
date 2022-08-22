import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'first_name is required' })
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Owner',
  })
  readonly first_name: string;

  @IsNotEmpty({ message: 'last_name is required' })
  @IsString({ message: 'last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Owner',
  })
  readonly last_name: string;

  @IsNotEmpty({ message: 'phone is required' })
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Owner',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'username is required' })
  @IsString({ message: 'username must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'username of the Owner',
  })
  readonly username: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @ApiProperty({
    example: 'APPassword',
    description: 'password of the Owner',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'role_id is required' })
  @IsPositive({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'role of the Owner',
  })
  readonly role_id: number;
}

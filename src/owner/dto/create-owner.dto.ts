import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsString({ message: 'first_name must be a string' })
  @ApiProperty({
    example: 'arian',
    description: 'first_name of the Owner',
  })
  readonly first_name: string;

  @IsString({ message: 'Last_name must be a string' })
  @ApiProperty({
    example: 'press2015',
    description: 'last_name of the Owner',
  })
  readonly last_name: string;

  @IsString({ message: 'Phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Owner',
  })
  readonly phone: string;

  @IsString({ message: 'username must be a string' })
  @ApiProperty({
    example: 'AP2015',
    description: 'username of the Owner',
  })
  readonly username: string;

  @IsString({ message: 'password must be a string' })
  @ApiProperty({
    example: 'APPassword',
    description: 'password of the Owner',
  })
  readonly password: string;

  @IsPositive({ message: 'role_id must be a positive number' })
  @ApiProperty({
    example: 12345,
    description: 'role of the Owner',
  })
  readonly role_id: number;
}

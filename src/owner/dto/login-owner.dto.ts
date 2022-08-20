import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponse {
  @ApiProperty({
    example: 'aSDTFGQAG43AWTAREAZYHZ43ERYHER5DYH5RAR3W2YHryhs5t6hw4et',
    description: 'auth_token of the Owner',
  })
  readonly token: string;
}

export class LoginRequest {
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
}

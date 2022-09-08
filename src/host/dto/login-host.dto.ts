import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HostLoginResponse {
  @ApiProperty({
    example: 'aSDTFGQAG43AWTAREAZYHZ43ERYHER5DYH5RAR3W2YHryhs5t6hw4et',
    description: 'auth_token of the Host',
  })
  readonly token: string;
}

export class HostLoginRequest {
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Host',
  })
  readonly phone: string;

  @IsString({ message: 'otp must be a string' })
  @ApiProperty({
    example: '12345',
    description: 'otp of the Host',
  })
  readonly otp: string;
}

export class HostOtpRequest {
  @IsString({ message: 'phone must be a string' })
  @ApiProperty({
    example: '+989012883045',
    description: 'phone of the Host',
  })
  readonly phone: string;
}

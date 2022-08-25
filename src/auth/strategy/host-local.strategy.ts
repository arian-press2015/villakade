import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class HostLocalStrategy extends PassportStrategy(
  Strategy,
  'host-local',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phone', passwordField: 'otp' });
  }

  async validate(phone: string, otp: string): Promise<any> {
    const host = await this.authService.validateHost(phone, otp);
    if (!host) {
      throw new UnauthorizedException();
    }
    return host;
  }
}

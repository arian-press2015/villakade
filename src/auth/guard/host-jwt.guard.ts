import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HostJwtGuard extends AuthGuard('host-jwt') {
  constructor() {
    super({
      property: 'host',
    });
  }
}

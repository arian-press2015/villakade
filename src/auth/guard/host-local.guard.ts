import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HostLocalGuard extends AuthGuard('host-local') {
  constructor() {
    super({
      property: 'hostInfo',
    });
  }
}

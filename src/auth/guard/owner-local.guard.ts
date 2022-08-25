import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OwnerLocalGuard extends AuthGuard('owner-local') {
  constructor() {
    super({
      property: 'owner',
    });
  }
}

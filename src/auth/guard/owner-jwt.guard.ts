import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OwnerJwtGuard extends AuthGuard('owner-jwt') {
  constructor() {
    super({
      property: 'owner',
    });
  }
}

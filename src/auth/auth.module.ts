import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  HostJwtStrategy,
  HostLocalStrategy,
  OwnerJwtStrategy,
  OwnerLocalStrategy,
} from './strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { OwnerModule } from '../owner/owner.module';
import { HostModule } from '../host/host.module';

@Module({
  imports: [
    forwardRef(() => OwnerModule),
    forwardRef(() => HostModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    OwnerJwtStrategy,
    OwnerLocalStrategy,
    HostJwtStrategy,
    HostLocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

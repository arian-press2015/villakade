import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OwnerJwtStrategy, OwnerLocalStrategy } from './strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  imports: [
    forwardRef(() => OwnerModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, OwnerJwtStrategy, OwnerLocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}

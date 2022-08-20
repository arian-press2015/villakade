import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategy';
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
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

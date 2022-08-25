import { forwardRef, Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [HostController],
  providers: [HostService],
  exports: [HostService],
})
export class HostModule {}

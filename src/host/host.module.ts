import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}

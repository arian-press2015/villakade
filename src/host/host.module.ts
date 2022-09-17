import { forwardRef, Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';
import { RedisService } from '../shared/services/redis.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [HostController],
  providers: [HostService, PrismaService, RedisService],
  exports: [HostService],
})
export class HostModule {}

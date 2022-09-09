import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ProvinceController],
  providers: [ProvinceService, PrismaService],
})
export class ProvinceModule {}

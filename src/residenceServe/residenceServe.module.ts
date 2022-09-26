import { Module } from '@nestjs/common';
import { ResidenceServeService } from './residenceServe.service';
import { ResidenceServeController } from './residenceServe.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceServeController],
  providers: [ResidenceServeService, PrismaService],
})
export class ResidenceServeModule {}

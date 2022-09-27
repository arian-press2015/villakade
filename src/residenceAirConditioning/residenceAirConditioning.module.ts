import { Module } from '@nestjs/common';
import { ResidenceAirConditioningService } from './residenceAirConditioning.service';
import { ResidenceAirConditioningController } from './residenceAirConditioning.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceAirConditioningController],
  providers: [ResidenceAirConditioningService, PrismaService],
})
export class ResidenceAirConditioningModule {}

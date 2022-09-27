import { Module } from '@nestjs/common';
import { ResidenceFacilityService } from './residenceFacility.service';
import { ResidenceFacilityController } from './residenceFacility.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceFacilityController],
  providers: [ResidenceFacilityService, PrismaService],
})
export class ResidenceFacilityModule {}

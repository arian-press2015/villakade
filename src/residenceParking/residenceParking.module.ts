import { Module } from '@nestjs/common';
import { ResidenceParkingService } from './residenceParking.service';
import { ResidenceParkingController } from './residenceParking.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceParkingController],
  providers: [ResidenceParkingService, PrismaService],
})
export class ResidenceParkingModule {}

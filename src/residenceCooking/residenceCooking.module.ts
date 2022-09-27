import { Module } from '@nestjs/common';
import { ResidenceCookingService } from './residenceCooking.service';
import { ResidenceCookingController } from './residenceCooking.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceCookingController],
  providers: [ResidenceCookingService, PrismaService],
})
export class ResidenceCookingModule {}

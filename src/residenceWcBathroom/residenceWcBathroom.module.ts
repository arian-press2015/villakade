import { Module } from '@nestjs/common';
import { ResidenceWcBathroomService } from './residenceWcBathroom.service';
import { ResidenceWcBathroomController } from './residenceWcBathroom.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceWcBathroomController],
  providers: [ResidenceWcBathroomService, PrismaService],
})
export class ResidenceWcBathroomModule {}

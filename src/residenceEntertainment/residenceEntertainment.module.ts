import { Module } from '@nestjs/common';
import { ResidenceEntertainmentService } from './residenceEntertainment.service';
import { ResidenceEntertainmentController } from './residenceEntertainment.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceEntertainmentController],
  providers: [ResidenceEntertainmentService, PrismaService],
})
export class ResidenceEntertainmentModule {}

import { Module } from '@nestjs/common';
import { ResidenceImageService } from './residenceImage.service';
import { ResidenceImageController } from './residenceImage.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceImageController],
  providers: [ResidenceImageService, PrismaService],
})
export class ResidenceImageModule {}

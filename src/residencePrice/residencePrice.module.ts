import { Module } from '@nestjs/common';
import { ResidencePriceService } from './residencePrice.service';
import { ResidencePriceController } from './residencePrice.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidencePriceController],
  providers: [ResidencePriceService, PrismaService],
})
export class ResidencePriceModule {}

import { Module } from '@nestjs/common';
import { ResidenceAttributeService } from './residenceAttribute.service';
import { ResidenceAttributeController } from './residenceAttribute.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';
import { ResidenceService } from '../residence/residence.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceAttributeController],
  providers: [ResidenceAttributeService, ResidenceService, PrismaService],
})
export class ResidenceAttributeModule {}

import { Module } from '@nestjs/common';
import { ResidenceRuleService } from './residenceRule.service';
import { ResidenceRuleController } from './residenceRule.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceRuleController],
  providers: [ResidenceRuleService, PrismaService],
})
export class ResidenceRuleModule {}

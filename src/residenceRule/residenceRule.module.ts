import { Module } from '@nestjs/common';
import { ResidenceRuleService } from './residenceRule.service';
import { ResidenceRuleController } from './residenceRule.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceRuleController],
  providers: [ResidenceRuleService],
})
export class ResidenceRuleModule {}

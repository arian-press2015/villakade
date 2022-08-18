import { Module } from '@nestjs/common';
import { ResidenceRuleService } from './residenceRule.service';
import { ResidenceRuleController } from './residenceRule.controller';

@Module({
  controllers: [ResidenceRuleController],
  providers: [ResidenceRuleService],
})
export class ResidenceRuleModule {}

import { Module } from '@nestjs/common';
import { ResidenceAttributeService } from './residenceAttribute.service';
import { ResidenceAttributeController } from './residenceAttribute.controller';

@Module({
  controllers: [ResidenceAttributeController],
  providers: [ResidenceAttributeService],
})
export class ResidenceAttributeModule {}

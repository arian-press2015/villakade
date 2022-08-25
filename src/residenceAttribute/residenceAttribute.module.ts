import { Module } from '@nestjs/common';
import { ResidenceAttributeService } from './residenceAttribute.service';
import { ResidenceAttributeController } from './residenceAttribute.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceAttributeController],
  providers: [ResidenceAttributeService],
})
export class ResidenceAttributeModule {}

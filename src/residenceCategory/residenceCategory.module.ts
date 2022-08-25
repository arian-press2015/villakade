import { Module } from '@nestjs/common';
import { ResidenceCategoryService } from './residenceCategory.service';
import { ResidenceCategoryController } from './residenceCategory.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceCategoryController],
  providers: [ResidenceCategoryService],
})
export class ResidenceCategoryModule {}

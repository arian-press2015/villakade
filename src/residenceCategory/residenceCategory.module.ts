import { Module } from '@nestjs/common';
import { ResidenceCategoryService } from './residenceCategory.service';
import { ResidenceCategoryController } from './residenceCategory.controller';

@Module({
  controllers: [ResidenceCategoryController],
  providers: [ResidenceCategoryService],
})
export class ResidenceCategoryModule {}

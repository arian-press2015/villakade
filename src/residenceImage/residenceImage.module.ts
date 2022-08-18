import { Module } from '@nestjs/common';
import { ResidenceImageService } from './residenceImage.service';
import { ResidenceImageController } from './residenceImage.controller';

@Module({
  controllers: [ResidenceImageController],
  providers: [ResidenceImageService],
})
export class ResidenceImageModule {}

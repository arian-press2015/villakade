import { Module } from '@nestjs/common';
import { ResidenceImageService } from './residenceImage.service';
import { ResidenceImageController } from './residenceImage.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceImageController],
  providers: [ResidenceImageService],
})
export class ResidenceImageModule {}

import { Module } from '@nestjs/common';
import { CategoryImageService } from './categoryImage.service';
import { CategoryImageController } from './categoryImage.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CategoryImageController],
  providers: [CategoryImageService],
})
export class CategoryImageModule {}

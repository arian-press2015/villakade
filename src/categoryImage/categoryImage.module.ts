import { Module } from '@nestjs/common';
import { CategoryImageService } from './categoryImage.service';
import { CategoryImageController } from './categoryImage.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoryImageController],
  providers: [CategoryImageService, PrismaService],
})
export class CategoryImageModule {}

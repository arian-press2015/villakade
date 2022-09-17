import { Module } from '@nestjs/common';
import { ContactUsService } from './contactUs.service';
import { ContactUsController } from './contactUs.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ContactUsController],
  providers: [ContactUsService, PrismaService],
})
export class ContactUsModule {}

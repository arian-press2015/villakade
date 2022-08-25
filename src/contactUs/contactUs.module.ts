import { Module } from '@nestjs/common';
import { ContactUsService } from './contactUs.service';
import { ContactUsController } from './contactUs.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}

import { Module } from '@nestjs/common';
import { ContactUsService } from './contactUs.service';
import { ContactUsController } from './contactUs.controller';

@Module({
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}

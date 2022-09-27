import { Module } from '@nestjs/common';
import { ResidenceRoomService } from './residenceRoom.service';
import { ResidenceRoomController } from './residenceRoom.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../shared/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [ResidenceRoomController],
  providers: [ResidenceRoomService, PrismaService],
})
export class ResidenceRoomModule {}

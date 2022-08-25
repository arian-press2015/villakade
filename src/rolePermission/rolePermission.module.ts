import { Module } from '@nestjs/common';
import { RolePermissionService } from './rolePermission.service';
import { RolePermissionController } from './rolePermission.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}

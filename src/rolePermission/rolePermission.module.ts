import { Module } from '@nestjs/common';
import { RolePermissionService } from './rolePermission.service';
import { RolePermissionController } from './rolePermission.controller';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
})
export class RolePermissionModule {}

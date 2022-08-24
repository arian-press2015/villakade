import { Injectable } from '@nestjs/common';
import {
  RolePermission,
  FilterRolePermissionDto,
  CreateRolePermissionDto,
  UpdateRolePermissionDto,
} from './dto';

@Injectable()
export class RolePermissionService {
  async create(
    createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    const rolePermission = {
      id: 1,
      role_id: createRolePermissionDto.role_id,
      permission_id: createRolePermissionDto.permission_id,
    };
    return rolePermission;
  }

  async getCount(
    filterRolePermissionDto: FilterRolePermissionDto,
  ): Promise<number> {
    return 1;
  }

  async findAll(
    filterRolePermissionDto: FilterRolePermissionDto,
  ): Promise<RolePermission[]> {
    const rolePermission = [
      {
        id: 1,
        role_id: 123,
        permission_id: 123,
      },
    ];
    return rolePermission;
  }

  async findOne(id: number): Promise<RolePermission> {
    const rolePermission = {
      id,
      role_id: 123,
      permission_id: 123,
    };
    return rolePermission;
  }

  async update(
    id: number,
    updateRolePermissionDto: UpdateRolePermissionDto,
  ): Promise<RolePermission> {
    const rolePermission = {
      id,
      role_id: updateRolePermissionDto.role_id || 123,
      permission_id: updateRolePermissionDto.permission_id || 123,
    };
    return rolePermission;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

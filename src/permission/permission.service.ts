import { Injectable } from '@nestjs/common';
import {
  Permission,
  FilterPermissionDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto';

@Injectable()
export class PermissionService {
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = {
      id: 1,
      title: createPermissionDto.title,
      fa_title: createPermissionDto.fa_title,
    };
    return permission;
  }

  async getCount(filterPermissionDto: FilterPermissionDto): Promise<number> {
    return 1;
  }

  async findAll(
    filterPermissionDto: FilterPermissionDto,
  ): Promise<Permission[]> {
    const permission = [
      {
        id: 1,
        title: 'delete-residence',
        fa_title: 'ویرایش اقامتگاه ها',
      },
    ];
    return permission;
  }

  async findOne(id: number): Promise<Permission> {
    const permission = {
      id,
      title: 'delete-residence',
      fa_title: 'ویرایش اقامتگاه ها',
    };
    return permission;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = {
      id,
      title: updatePermissionDto.title || 'delete-residence',
      fa_title: updatePermissionDto.fa_title || 'ویرایش اقامتگاه ها',
    };
    return permission;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

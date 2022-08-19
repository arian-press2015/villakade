import { Injectable } from '@nestjs/common';
import { Role, FilterRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = {
      id: 1,
      title: createRoleDto.title,
      fa_title: createRoleDto.fa_title,
    };
    return role;
  }

  async findAll(filterRoleDto: FilterRoleDto): Promise<Role[]> {
    const role = [
      {
        id: 1,
        title: 'residence-management',
        fa_title: 'ویرایش اقامتگاه ها',
      },
    ];
    return role;
  }

  async findOne(id: number): Promise<Role> {
    const role = {
      id,
      title: 'residence-management',
      fa_title: 'ویرایش اقامتگاه ها',
    };
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = {
      id,
      title: updateRoleDto.title || 'residence-management',
      fa_title: updateRoleDto.fa_title || 'ویرایش اقامتگاه ها',
    };
    return role;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

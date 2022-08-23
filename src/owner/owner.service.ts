import { Injectable } from '@nestjs/common';
import { Owner, FilterOwnerDto, CreateOwnerDto, UpdateOwnerDto } from './dto';

@Injectable()
export class OwnerService {
  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = {
      id: 1,
      first_name: createOwnerDto.first_name,
      last_name: createOwnerDto.last_name,
      phone: createOwnerDto.phone,
      username: createOwnerDto.username,
      password: createOwnerDto.password,
      role_id: createOwnerDto.role_id,
    };
    return owner;
  }

  async getCount(filterOwnerDto: FilterOwnerDto): Promise<number> {
    return 1;
  }

  async findAll(filterOwnerDto: FilterOwnerDto): Promise<Owner[]> {
    const owner = [
      {
        id: 1,
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        username: 'AP2015',
        password: 'APPassword',
        role_id: 123,
      },
    ];
    return owner;
  }

  async findOne(id: number): Promise<Owner> {
    const owner = {
      id,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      username: 'AP2015',
      password: 'APPassword',
      role_id: 123,
    };
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = {
      id,
      first_name: updateOwnerDto.first_name || 'arian',
      last_name: updateOwnerDto.last_name || 'press2015',
      phone: updateOwnerDto.phone || '+989012883045',
      username: updateOwnerDto.username || 'AP2015',
      password: updateOwnerDto.password || 'APPassword',
      role_id: updateOwnerDto.role_id || 123,
    };
    return owner;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

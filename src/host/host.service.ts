import { Injectable } from '@nestjs/common';
import { Host, FilterHostDto, CreateHostDto, UpdateHostDto } from './dto';
import { HostOtpRequest } from './dto/login-host.dto';

@Injectable()
export class HostService {
  async getOtp(hostOtpRequest: HostOtpRequest): Promise<void> {
    return;
  }

  async create(createHostDto: CreateHostDto): Promise<Host> {
    const host = {
      id: 1,
      first_name: createHostDto.first_name,
      last_name: createHostDto.last_name,
      phone: createHostDto.phone,
      vip: createHostDto.vip,
      active: createHostDto.active,
    };
    return host;
  }

  async getCount(filterHostDto: FilterHostDto): Promise<number> {
    return 1;
  }

  async findAll(filterHostDto: FilterHostDto): Promise<Host[]> {
    const host = [
      {
        id: 1,
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        vip: true,
        active: true,
      },
    ];
    return host;
  }

  async findOne(id: number): Promise<Host> {
    const host = {
      id,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      vip: true,
      active: true,
    };
    return host;
  }

  async findByPhone(phone: string): Promise<Host> {
    const host = {
      id: 123,
      first_name: 'arian',
      last_name: 'press2015',
      phone,
      vip: true,
      active: true,
    };
    return host;
  }

  async update(id: number, updateHostDto: UpdateHostDto): Promise<Host> {
    const host = {
      id,
      first_name: updateHostDto.first_name || 'arian',
      last_name: updateHostDto.last_name || 'press2015',
      phone: updateHostDto.phone || '+989012883045',
      vip: true,
      active: true,
    };
    return host;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

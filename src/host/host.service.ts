import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { totp } from 'otplib';
import { PrismaService } from '../shared/services/prisma.service';
import { RedisService } from '../shared/services/redis.service';
import { Host, FilterHostDto, CreateHostDto, UpdateHostDto } from './dto';
import { HostOtpRequest } from './dto/login-host.dto';

const select = {
  id: true,
  first_name: true,
  last_name: true,
  phone: true,
  vip: true,
  active: true,
};

@Injectable()
export class HostService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private ConfigService: ConfigService,
  ) {}
  async getOtp(hostOtpRequest: HostOtpRequest): Promise<void> {
    try {
      // create an otp
      const secret = await this.ConfigService.get('otp_secret');
      const otp = totp.generate(secret);

      // store the otp
      const pattern = `host-login-otp-${hostOtpRequest.phone}`;
      await this.redis.set(pattern, otp);
      await this.redis.expire(pattern, 120);

      // send the otp
      console.log(`otp is ${otp}`);

      return;
    } catch (e) {
      console.log('Error in HostService.create()', e.code, e.meta);
      throw e;
    }
  }

  async create(createHostDto: CreateHostDto): Promise<Host> {
    try {
      const { active, vip, ...data } = createHostDto;
      const host = await this.prisma.host.create({
        select,
        data: {
          ...data,
          vip: false,
          active: false,
        },
      });
      return host;
    } catch (e) {
      console.log('Error in HostService.create()', e.code, e.meta);
      if (e.code && e.code === 'P2002' && e.meta.target === 'host_phone_UN') {
        throw new BadRequestException('phone already exists');
      }
      throw e;
    }
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
    const host = await this.prisma.host.findUnique({
      select,
      where: { id },
    });

    if (host === null) {
      throw new BadRequestException('host not found');
    }

    return host;
  }

  // used only for auth mechanisms
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

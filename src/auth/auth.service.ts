import { Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { JwtService } from '@nestjs/jwt';
import { HostService } from '../host/host.service';
import { RedisService } from '../shared/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private hostService: HostService,
    private jwtService: JwtService,
    private redis: RedisService,
  ) {}

  async validateOwner(username: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findByUsername(username);
    if (owner && owner.password === pass) {
      const { password, ...result } = owner;
      return result;
    }
    return null;
  }

  async validateHost(phone: string, otp: string): Promise<any> {
    const host = await this.hostService.findByPhone(phone);

    const pattern = `host-login-otp-${phone}`;
    const redisOtp = await this.redis.get(pattern);
    if (otp === redisOtp) {
      return host;
    }
    console.log('!!@#$#', host);
    return null;
  }

  async ownerLogin(owner: any) {
    const payload = { username: owner.username, owner_id: owner.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async hostLogin(host: any) {
    const payload = { host_id: host.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

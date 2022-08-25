import { Injectable } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private jwtService: JwtService,
  ) {}

  async validateOwner(username: string, pass: string): Promise<any> {
    const owner = await this.ownerService.findByUsername(username);
    if (owner && owner.password === pass) {
      const { password, ...result } = owner;
      return result;
    }
    return null;
  }

  async login(owner: any) {
    const payload = { username: owner.username, owner_id: owner.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

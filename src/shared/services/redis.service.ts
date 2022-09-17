import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  readonly client: RedisClientType;
  constructor(private configService: ConfigService) {
    this.client = createClient({
      url: this.configService.get<string>('redis_url'),
    });
  }

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (e) {
      console.log('Redis Client Error', e);
    }
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }

  async set(pattern, value) {
    await this.client.set(pattern, value);
  }

  async get(pattern) {
    return await this.client.get(pattern);
  }

  async expire(pattern, ttl) {
    await this.client.expire(pattern, ttl);
  }

  async del(pattern) {
    await this.client.del(pattern);
  }
}

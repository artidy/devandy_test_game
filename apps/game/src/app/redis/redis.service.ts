import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    const host = this.configService.get<string>('redis.host');
    const port = this.configService.get<number>('redis.port');

    this.redisClient = new Redis({
      host,
      port,
    });
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
    } else {
      await this.redisClient.set(key, JSON.stringify(value));
    }
  }

  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return JSON.parse(value);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}

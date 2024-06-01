import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerService } from './player.service';
import { RedisModule } from '../redis/redis.module';
import { PlayerEntity } from './player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), RedisModule],
  providers: [PlayerService],
  exports: [PlayerService]
})
export class PlayerModule {}

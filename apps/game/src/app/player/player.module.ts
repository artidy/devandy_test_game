import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerService } from './player.service';
import { RedisModule } from '../redis/redis.module';
import { PlayerEntity } from './player.entity';
import { PlayerController } from './player.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity]), RedisModule],
  providers: [PlayerService],
  controllers: [PlayerController],
  exports: [PlayerService]
})
export class PlayerModule {}

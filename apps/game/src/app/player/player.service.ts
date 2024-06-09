import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Player } from '@devandy-test-game/shared';
import { PlayerEntity } from './player.entity';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
    private readonly redisService: RedisService,
  ) {}

  async getPlayers(excludeId?: string): Promise<Player[]> {
    if (excludeId) {
      return await this.playerRepository.find({ where: { telegramId: Not(excludeId) } });
    }

    return await this.playerRepository.find();
  }

  async getPlayer(telegramId: string): Promise<Player> {
    const cachedPlayer = await this.redisService.get(`player:${telegramId}`);

    if (cachedPlayer) {
      return JSON.parse(cachedPlayer);
    }

    const player = await this.playerRepository.findOne({ where: { telegramId } });

    if (player) {
      await this.redisService.set(`player:${telegramId}`, JSON.stringify(player));
    }

    return player;
  }

  async createPlayer(playerData: Partial<PlayerEntity>): Promise<Player> {
    const existedPlayer = await this.playerRepository.findOne({ where: { telegramId: playerData.telegramId }});

    if(existedPlayer) {
      return existedPlayer;
    }

    const player = await this.playerRepository.save(playerData);

    await this.redisService.set(`player:${player.id}`, JSON.stringify(player));

    return player;
  }

  async updatePlayer(telegramId: string, updateData: Partial<PlayerEntity>): Promise<Player> {
    await this.playerRepository.update({ telegramId }, updateData);
    const updatedPlayer = await this.getPlayer(telegramId);

    if (updatedPlayer) {
      await this.redisService.set(`player:${telegramId}`, JSON.stringify(updatedPlayer));
    }

    return updatedPlayer;
  }

  async deletePlayer(telegramId: string): Promise<void> {
    await this.playerRepository.delete({ telegramId });
    await this.redisService.del(`player:${telegramId}`);
  }
}

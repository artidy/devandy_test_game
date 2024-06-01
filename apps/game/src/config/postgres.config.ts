import { registerAs, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PlayerEntity } from '../app/player/player.entity';

export const postgresConfig = registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}));

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('postgres.host'),
    port: configService.get<number>('postgres.port'),
    username: configService.get<string>('postgres.username'),
    password: configService.get<string>('postgres.password'),
    database: configService.get<string>('postgres.database'),
    entities: [PlayerEntity],
    synchronize: true,
});



import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { PlayerEntity } from '../player/player.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [PlayerEntity],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

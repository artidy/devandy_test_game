import { Module, Global, DynamicModule, Provider } from '@nestjs/common';

import { RedisModuleOptions, RedisModuleAsyncOptions } from './redis.interface';

@Global()
@Module({})
export class RedisCoreModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisCoreModule,
      providers: [
        {
          provide: 'REDIS_MODULE_OPTIONS',
          useValue: options,
        },
      ],
      exports: ['REDIS_MODULE_OPTIONS'],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisCoreModule,
      imports: options.imports,
      providers: this.createAsyncProviders(options),
      exports: ['REDIS_MODULE_OPTIONS'],
    };
  }

  private static createAsyncProviders(options: RedisModuleAsyncOptions): Provider[] {
    return [
      {
        provide: 'REDIS_MODULE_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }
}

export interface RedisModuleOptions {
  host: string;
  port: number;
}

export interface RedisModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
  inject?: any[];
  imports?: any[];
}

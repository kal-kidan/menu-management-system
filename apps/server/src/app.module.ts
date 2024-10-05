import { Module } from '@nestjs/common';

import { ConfigurationModule } from './core/configuration';
import { CookieModule } from './core/cookie';
import { CorsModule } from './core/cors';
// import { PrismaModule } from './core/database';
import { ExceptionModule } from './core/exception';
import { LoggingModule } from './core/logging';
import { LoggerModule } from './libraries/logger';




@Module({
  imports: [
    CorsModule,
    LoggerModule,
    ExceptionModule,
    CookieModule,
    LoggingModule,
    // PrismaModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [
    ...ExceptionModule.getFilters(),
    ...LoggingModule.getInterceptors()
  ],
})
export class AppModule { }

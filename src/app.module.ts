import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middelware/logger.middelware';
import { ConfigUtil } from './utils/config';

@Module({
  imports: ConfigUtil.AppModule.imports,
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

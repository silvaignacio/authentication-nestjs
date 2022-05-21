import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { HandleMiddleware } from './shared/middleware/handle.middleware';
import { ConfigModule } from '@nestjs/config';
import environments from './shared/configuration/environments';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environments],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(HandleMiddleware).forRoutes('auth/login');
  }
}

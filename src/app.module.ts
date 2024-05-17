import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdapterConfigModule } from './config/adapterConfig.module';
import { ConfigAdapter } from './config/outbound-adapter/config.adapter';
import { CONFIG_OUTBOUND_PORT } from './config/outbound-port/config.outbound-port';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { PassportAdapterModule } from './passport/passport.module';
import { JwtAdapterModule } from './jwt/jwt.module';
import * as process from 'node:process';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`],
            isGlobal: true,
        }),
        AuthModule,
        AdapterConfigModule,
        PassportAdapterModule,
        JwtAdapterModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        AppService,
        {
            provide: CONFIG_OUTBOUND_PORT,
            useClass: ConfigAdapter,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}

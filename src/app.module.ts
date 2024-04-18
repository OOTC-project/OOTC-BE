import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        MemberModule,
        PrismaModule,
        ConfigModule.forRoot({
            // envFilePath: `config/.env.${process.env.NODE_ENV}`,
            envFilePath: [`.env`],
            isGlobal: true,
            // validationSchema: Joi.object({
            // MYSQL_HOST: Joi.string().required(),
            // MYSQL_PORT: Joi.number().required(),
            // MYSQL_USER: Joi.string().required(),
            // MYSQL_PASSWORD: Joi.string().required(),
            // MYSQL_DB: Joi.string().required(),
            // PORT: Joi.number(),
            // JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
            // JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
            // JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
            // JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
            // JWT_SESS_TOKEN_SECRET: Joi.string().required(),
            // JWT_SESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
            // }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

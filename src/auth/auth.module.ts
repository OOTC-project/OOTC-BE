import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AUTH_OUTBOUND_PORT } from './outbound-port/auth.outbound-port';
import { AuthRepository } from './outbound-adapter/auth.repository';
import { AUTH_INBOUND_PORT } from './inbound-port/auth.inbound-port';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAdapterModule } from '../jwt/jwt.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
    imports: [PrismaModule, JwtAdapterModule, MailerModule],
    controllers: [AuthController],
    providers: [
        {
            provide: AUTH_INBOUND_PORT,
            useClass: AuthService,
        },
        {
            provide: AUTH_OUTBOUND_PORT,
            useClass: AuthRepository,
        },
    ],
    exports: [AUTH_OUTBOUND_PORT, AUTH_INBOUND_PORT],
})
export class AuthModule {}

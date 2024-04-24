import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AUTH_OUTBOUND_PORT } from './outbound-port/auth.outbound-port';
import { AuthRepository } from './outbound-adapter/auth.repository';
import { AUTH_INBOUND_PORT } from './inbound-port/auth.inbound-port';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
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
})
export class AuthModule {}

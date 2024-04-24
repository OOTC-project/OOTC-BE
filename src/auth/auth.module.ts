import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ADMIN_INBOUND_PORT } from './inbound-port/auth.inbound-port';

@Module({
    controllers: [AuthController],
    providers: [
        {
            provide: ADMIN_INBOUND_PORT,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}

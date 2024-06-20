import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { USER_INBOUND_PORT } from './inbound-port/user.inbound-port';
import { USER_OUTBOUND_PORT } from './outbound-port/user.outbound-port';
import { UserRepository } from './outbound-adapter/user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [
        {
            provide: USER_INBOUND_PORT,
            useClass: UserService,
        },
        {
            provide: USER_OUTBOUND_PORT,
            useClass: UserRepository,
        },
    ],
})
export class UserModule {}

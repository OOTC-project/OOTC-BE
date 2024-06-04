import { Module } from '@nestjs/common';
import { CodyController } from './controller/cody.controller';
import { CodyService } from './service/cody.service';
import { CODY_INBOUND_PORT } from './inbound-port/cody.inbound-port';
import { CODY_OUTBOUND_PORT } from './outbound-port/cody.outbound-port';
import { CodyRepository } from './outbound-adapter/cody.repository';

@Module({
    controllers: [CodyController],
    providers: [
        {
            provide: CODY_INBOUND_PORT,
            useClass: CodyService,
        },
        {
            provide: CODY_OUTBOUND_PORT,
            useClass: CodyRepository,
        },
    ],
})
export class CodyModule {}

import { Module } from '@nestjs/common';
import { ClothesController } from './controller/clothes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CLOTHES_INBOUND_PORT } from './inbound-port/clothes.inbound-port';
import { ClothesService } from './service/clothes.service';
import { CLOTHES_OUTBOUND_PORT } from './outbound-port/clothes.outbound-port';
import { ClothesRepository } from './outbound-adapter/clothes.repository';

@Module({
    imports: [PrismaModule],
    controllers: [ClothesController],
    providers: [
        {
            provide: CLOTHES_INBOUND_PORT,
            useClass: ClothesService,
        },
        {
            provide: CLOTHES_OUTBOUND_PORT,
            useClass: ClothesRepository,
        },
    ],
})
export class ClothesModule {}

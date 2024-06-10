import { Module } from '@nestjs/common';
import { RecommendController } from './controllers/recommend.controller';
import { RecommendService } from './services/recommend.service';
import { RECOMMEND_INBOUND_PORT } from './inbound-port/recommend.inbound-port';
import { RECOMMEND_OUTBOUND_PORT } from './outbound-port/recommend.outbound-port';
import { RecommendRepository } from './outbound-adapter/recommend.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [RecommendController],
    providers: [
        {
            provide: RECOMMEND_INBOUND_PORT,
            useClass: RecommendService,
        },
        {
            provide: RECOMMEND_OUTBOUND_PORT,
            useClass: RecommendRepository,
        },
    ],
})
export class RecommendModule {}

import { Injectable } from '@nestjs/common';
import { RecommendOutboundPort } from '../outbound-port/recommend.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecommendRepository implements RecommendOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async doRecommend(user, doRecommend) {
        console.log('=>(recommend.repository.ts:10) doRecommend', doRecommend);
        return this.prisma.recommend.create({
            data: {
                fkMemberId: user.id,
                fkCodyId: doRecommend.cody,
            },
        });
    }

    //! soft Delete 고려해야할듯

    async minusRecommend(id, doRecommend) {
        return this.prisma.recommend.delete({
            where: {
                id,
            },
        });
    }
}

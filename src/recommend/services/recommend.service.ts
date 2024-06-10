import { Inject, Injectable } from '@nestjs/common';
import { RecommendInboundPort } from '../inbound-port/recommend.inbound-port';
import { RECOMMEND_OUTBOUND_PORT, RecommendOutboundPort } from '../outbound-port/recommend.outbound-port';

@Injectable()
export class RecommendService implements RecommendInboundPort {
    constructor(
        @Inject(RECOMMEND_OUTBOUND_PORT)
        private readonly recommendOutboundPort: RecommendOutboundPort,
    ) {}

    async doRecommend(user, doRecommend) {
        return this.recommendOutboundPort.doRecommend(user, doRecommend);
    }

    async minusRecommend(id, doRecommend) {
        return this.recommendOutboundPort.minusRecommend(id, doRecommend);
    }
}

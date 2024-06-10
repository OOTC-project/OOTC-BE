export const RECOMMEND_INBOUND_PORT = 'RECOMMEND_INBOUND_PORT' as const;

export interface RecommendInboundPort {
    doRecommend(user, doRecommend);

    minusRecommend(id, doRecommend);
}

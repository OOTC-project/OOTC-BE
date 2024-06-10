export const RECOMMEND_OUTBOUND_PORT = 'RECOMMEND_OUTBOUND_PORT' as const;

export interface RecommendOutboundPort {
    doRecommend(user, doRecommend);

    minusRecommend(id, doRecommend);
}

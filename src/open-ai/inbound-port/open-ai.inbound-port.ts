export const OPENAI_INBOUND_PORT = 'OPENAI_INBOUND_PORT' as const;

export interface OpenAiInboundPort {
    recommendLook({ city, country });
}

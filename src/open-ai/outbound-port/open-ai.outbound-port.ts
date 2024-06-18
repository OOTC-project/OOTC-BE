export const OPENAI_OUTBOUND_PORT = 'OPENAI_OUTBOUND_PORT' as const;

export interface OpenAiOutboundPort {
    recommendLook({ city, country });
}

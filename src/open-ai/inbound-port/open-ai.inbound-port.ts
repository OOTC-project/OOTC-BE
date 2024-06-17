export const OPENAI_INBOUND_PORT = 'OPENAI_INBOUND_PORT' as const;

export interface OpenAiInboundPort {
    getWeather(city: string);
}

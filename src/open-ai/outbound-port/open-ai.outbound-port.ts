import { ChatCompletion } from 'openai/resources';
import Choice = ChatCompletion.Choice;

export const OPENAI_OUTBOUND_PORT = 'OPENAI_OUTBOUND_PORT' as const;

export interface OpenAiOutboundPort {
    recommendLook({ city, country }): Promise<Choice>;
}

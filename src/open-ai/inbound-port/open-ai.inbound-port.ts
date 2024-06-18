import { RequestRecommendLookDto } from '../dtos/request_recommendLook.dto';
import { ChatCompletion } from 'openai/resources';
import Choice = ChatCompletion.Choice;

export const OPENAI_INBOUND_PORT = 'OPENAI_INBOUND_PORT' as const;

export interface OpenAiInboundPort {
    recommendLook({ city, country }: RequestRecommendLookDto): Promise<Choice>;
}

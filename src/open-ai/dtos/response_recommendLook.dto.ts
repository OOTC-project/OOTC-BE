export class ResponseRecommendLookDto {
    index: number;
    message: {
        role: string;
        content: string;
    };
    logprobs: null;
    finish_reason: string;
}

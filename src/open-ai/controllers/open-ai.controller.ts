import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { OPENAI_INBOUND_PORT, OpenAiInboundPort } from '../inbound-port/open-ai.inbound-port';
import { RequestRecommendLookDto } from '../dtos/request_recommendLook.dto';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseRecommendLookDto } from '../dtos/response_recommendLook.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('open-ai')
export class OpenAiController {
    constructor(
        @Inject(OPENAI_INBOUND_PORT)
        private readonly openAiInboundPort: OpenAiInboundPort,
    ) {}

    @Get()
    @ApiOperation({ summary: '날씨에 따른 복장 추천', description: '날씨에 따른 복장 추천' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseRecommendLookDto,
            exampleTitle: '코디 생성 성공',
            exampleDescription: '코디 생성이 성공적으로 이루어졌습니다.',
            overwriteValue: {
                index: 0,
                message: {
                    role: 'assistant',
                    content:
                        "Based on the current weather in Seoul, KR, I recommend wearing light and breathable clothing such as shorts, t-shirts, dresses, and sandals. It's a sunny day with clear skies and a temperature of around 31°C, so you'll want to dress comfortably to stay cool.\n\n제안하는 의상은 반바지, 티셔츠, 원피스 및 샌들과 같이 가볍고 통기성 있는 옷을 입는 것입니다. 오늘은 맑은 하늘에 온도가 약 31°C 정도인 맑은 날씨이므로 시원하게 입으셔야 합니다.",
                },
                logprobs: null,
                finish_reason: 'stop',
            },
        },
    ])
    async recommendLook(@Query() { city, country }: RequestRecommendLookDto) {
        console.log(city, country);
        return this.openAiInboundPort.recommendLook({ city, country });
    }
}

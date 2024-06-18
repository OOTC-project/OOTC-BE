import { Controller, Get, Inject, Query } from '@nestjs/common';
import { OPENAI_INBOUND_PORT, OpenAiInboundPort } from '../inbound-port/open-ai.inbound-port';

@Controller('open-ai')
export class OpenAiController {
    constructor(
        @Inject(OPENAI_INBOUND_PORT)
        private readonly openAiInboundPort: OpenAiInboundPort,
    ) {}

    @Get()
    async recommendLook(@Query() { city, country }) {
        return this.openAiInboundPort.recommendLook({ city, country });
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { OpenAiInboundPort } from '../inbound-port/open-ai.inbound-port';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import { OPENAI_OUTBOUND_PORT, OpenAiOutboundPort } from '../outbound-port/open-ai.outbound-port';

@Injectable()
export class OpenAiService implements OpenAiInboundPort {
    constructor(
        @Inject(CONFIG_OUTBOUND_PORT)
        private configAdapter: ConfigOutboundPort,
        @Inject(OPENAI_OUTBOUND_PORT)
        private readonly openAiOutboundPort: OpenAiOutboundPort,
    ) {}

    async recommendLook({ city, country }) {
        return this.openAiOutboundPort.recommendLook({ city, country });
    }
}

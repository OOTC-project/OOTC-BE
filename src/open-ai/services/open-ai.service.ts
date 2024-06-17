import { Injectable } from '@nestjs/common';
import { OpenAiInboundPort } from '../inbound-port/open-ai.inbound-port';

@Injectable()
export class OpenAiService implements OpenAiInboundPort {
    constructor() {}
}

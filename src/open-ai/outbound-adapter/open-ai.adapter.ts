import { Injectable } from '@nestjs/common';
import { OpenAiOutboundPort } from '../outbound-port/open-ai.outbound-port';

@Injectable()
export class OpenAiAdapter implements OpenAiOutboundPort {
    constructor() {}
}

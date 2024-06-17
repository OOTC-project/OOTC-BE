import { Module } from '@nestjs/common';
import { OpenAiController } from './controllers/open-ai.controller';
import { OpenAiService } from './services/open-ai.service';
import { OPENAI_INBOUND_PORT } from './inbound-port/open-ai.inbound-port';
import { OPENAI_OUTBOUND_PORT } from './outbound-port/open-ai.outbound-port';
import { OpenAiAdapter } from './outbound-adapter/open-ai.adapter';

@Module({
    controllers: [OpenAiController],
    providers: [
        {
            provide: OPENAI_INBOUND_PORT,
            useClass: OpenAiService,
        },
        {
            provide: OPENAI_OUTBOUND_PORT,
            useClass: OpenAiAdapter,
        },
    ],
})
export class OpenAiModule {}

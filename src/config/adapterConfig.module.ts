import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_OUTBOUND_PORT } from './outbound-port/config.outbound-port';
import { ConfigAdapter } from './outbound-adapter/config.adapter';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: CONFIG_OUTBOUND_PORT,
            useFactory: (configService: ConfigService) => new ConfigAdapter(configService),
            inject: [ConfigService],
        },
    ],
    exports: [CONFIG_OUTBOUND_PORT],
})
export class AdapterConfigModule {}

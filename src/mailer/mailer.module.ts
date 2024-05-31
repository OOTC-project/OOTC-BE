import { Global, Module } from '@nestjs/common';
import { MAILER_OUTBOUND_PORT } from './outbound-port/mailer.outbound-port';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerAdapter } from './outbound-adapter/mailer.adapter';
import { MailerCoreModule } from '@nestjs-modules/mailer/dist/mailer-core.module';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../config/outbound-port/config.outbound-port';
import { AdapterConfigModule } from '../config/adapterConfig.module';

@Global()
@Module({
    imports: [
        AdapterConfigModule,
        MailerCoreModule.forRootAsync({
            inject: [CONFIG_OUTBOUND_PORT],
            useFactory: (configAdapter: ConfigOutboundPort) => ({
                transport: {
                    host: 'smtp.naver.com',
                    port: 587,
                    auth: {
                        user: configAdapter.getConfigByKey('NAVER_EMAIL_ADDRESS'),
                        pass: configAdapter.getConfigByKey('NAVER_EMAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `'OOTC' <${configAdapter.getConfigByKey('NAVER_EMAIL_ADDRESS')}>`, //보낸사람
                },
                // template: {
                //     dir: join(__dirname, 'templates'),
                //     adapter: new PugAdapter(), // 또는 HandlebarsAdapter
                //     options: {
                //         strict: true,
                //     },
                // },
            }),
        }),
    ],
    providers: [
        {
            provide: MAILER_OUTBOUND_PORT,
            useFactory: (mailerService: MailerService) => new MailerAdapter(mailerService),
            inject: [MailerService],
        },
    ],
    exports: [MAILER_OUTBOUND_PORT],
})
export class MailerModule {}

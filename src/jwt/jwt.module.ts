import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../config/outbound-port/config.outbound-port';
import { AdapterConfigModule } from '../config/adapterConfig.module';
import { JWT_OUTBOUND_PORT } from './outbound-port/jwt.outbound-port';
import { JwtAdapter } from './outbound-adapter/jwt.adapter';

@Global()
@Module({
    imports: [
        AdapterConfigModule,
        JwtModule.registerAsync({
            imports: [AdapterConfigModule],
            inject: [CONFIG_OUTBOUND_PORT],
            useFactory: async (configAdapter: ConfigOutboundPort) => ({
                secret: configAdapter.getConfigByKey('JWT_SECRET'),
                signOptions: { expiresIn: configAdapter.getConfigByKey('JWT_EXPIRES_IN') },
            }),
        }),
    ],
    providers: [
        {
            provide: JWT_OUTBOUND_PORT,
            useFactory: (jwtService: JwtService) => new JwtAdapter(jwtService),
            inject: [JwtService],
        },
    ],
    exports: [JWT_OUTBOUND_PORT],
})
export class JwtAdapterModule {}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_OUTBOUND_PORT } from '../../config/outbound-port/config.outbound-port';
import { ConfigAdapter } from '../../config/outbound-adapter/config.adapter';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(CONFIG_OUTBOUND_PORT)
        private readonly configAdapter: ConfigAdapter,
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configAdapter.getConfigByKey('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const userId = payload.sub;
        const user = await this.authInboundPort.validateUser(userId);
        if (!user) {
            throw new UnauthorizedException('Unauthorized access');
        }
        return user;
    }
}

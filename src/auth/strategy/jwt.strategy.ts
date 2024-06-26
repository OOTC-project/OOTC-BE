import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_OUTBOUND_PORT } from '../../config/outbound-port/config.outbound-port';
import { ConfigAdapter } from '../../config/outbound-adapter/config.adapter';
import { JWT_OUTBOUND_PORT, JwtOutboundPort } from '../../jwt/outbound-port/jwt.outbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(CONFIG_OUTBOUND_PORT)
        private readonly configAdapter: ConfigAdapter,
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
        @Inject(JWT_OUTBOUND_PORT)
        private readonly jwtOutboundPort: JwtOutboundPort,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configAdapter.getConfigByKey('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.authOutboundPort.validateUser(payload.userId);
        if (!user) {
            throw new UnauthorizedException('Unauthorized access');
        }
        return user;
    }
}

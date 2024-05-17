import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportOutboundPort } from '../outbound-port/passport.outbound-port';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../../auth/inbound-port/auth.inbound-port';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {
        super();
    }

    async validate(userId: string): Promise<any> {
        const user = await this.authInboundPort.validateUser({ userId });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

@Injectable()
export class PassportAdapter implements PassportOutboundPort {
    constructor(private readonly localStrategy: LocalStrategy) {}

    use() {
        return this.localStrategy;
    }
}

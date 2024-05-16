import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportOutboundPort } from '../outbound-port/passport.outbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../../auth/outbound-port/auth.outbound-port';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
    ) {
        super();
    }

    async validate(userId: string, password: string): Promise<any> {
        const user = await this.authOutboundPort.validateUser(userId, password);
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

import { Inject, Injectable } from '@nestjs/common';
import { AuthInboundPort, RequestOfSignIn } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';

@Injectable()
export class AuthService implements AuthInboundPort {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
    ) {}

    async signUp(userData: RequestOfSignIn, files: { profileImg?: Express.Multer.File[]; backgroundImg?: Express.Multer.File[] }) {
        return await this.authOutboundPort.signIn(userData, files);
    }
}

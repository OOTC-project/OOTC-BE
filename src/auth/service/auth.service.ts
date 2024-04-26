import { Inject, Injectable } from '@nestjs/common';
import { AuthInboundPort, RequestOfSignIn } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthInboundPort {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
    ) {}

    async signUp(userData: RequestOfSignIn, files: AWSS3Type) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const hashedPasswordUserData = {
            ...userData,
            password: hashedPassword,
        };
        return await this.authOutboundPort.signIn(hashedPasswordUserData, files);
    }
}

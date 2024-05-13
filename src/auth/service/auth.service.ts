import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import * as bcrypt from 'bcrypt';
import { RequestOfSignIn, RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

@Injectable()
export class AuthService implements AuthInboundPort {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
    ) {}

    async signUp(userData: RequestOfSignUp, files: AWSS3Type): Promise<ResponseOfSignUp> {
        const { password, passwordConfirm } = userData;
        if (password !== passwordConfirm) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const hashedPasswordUserData = {
            ...userData,
            password: hashedPassword,
        };
        return await this.authOutboundPort.signUp(hashedPasswordUserData, files);
    }

    async signIn(userData: RequestOfSignIn) {}
}

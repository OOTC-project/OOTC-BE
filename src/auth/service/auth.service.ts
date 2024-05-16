import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import * as bcrypt from 'bcrypt';
import { RequestOfSignIn, RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';
import { JWT_OUTBOUND_PORT, JwtOutboundPort } from '../../jwt/outbound-port/jwt.outbound-port';

@Injectable()
export class AuthService implements AuthInboundPort {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
        @Inject(JWT_OUTBOUND_PORT)
        private readonly jwtOutboundPort: JwtOutboundPort,
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

    async validateUser(userData: RequestOfSignIn) {
        const { userId, password } = userData;

        const findMemberByUserId = await this.authOutboundPort.validateUser(userId, password);
        if (findMemberByUserId.length === 0) {
            throw new UnauthorizedException('해당 계정이 없습니다');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, findMemberByUserId.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('아이디 비밀번호를 확인해주세요!');
        }
        return findMemberByUserId;
    }
}

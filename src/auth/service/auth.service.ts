import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import * as bcrypt from 'bcrypt';
import { RequestOfFind, RequestOfSignIn, RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';
import { JWT_OUTBOUND_PORT, JwtOutboundPort } from '../../jwt/outbound-port/jwt.outbound-port';
import _ from 'lodash';
import { ResponseFindIdDto } from '../dtos/response_findId.dto';
import dayjs from 'dayjs';
import { MAILER_OUTBOUND_PORT, MailerOutboundPort } from '../../mailer/outbound-port/mailer.outbound-port';

@Injectable()
export class AuthService implements AuthInboundPort {
    constructor(
        @Inject(AUTH_OUTBOUND_PORT)
        private readonly authOutboundPort: AuthOutBoundPort,
        @Inject(JWT_OUTBOUND_PORT)
        private readonly jwtOutboundPort: JwtOutboundPort,
        @Inject(MAILER_OUTBOUND_PORT)
        private readonly mailerOutboundPort: MailerOutboundPort,
    ) {}

    async signUp(userData: RequestOfSignUp): Promise<ResponseOfSignUp> {
        const { password, passwordConfirm } = userData;
        if (password !== passwordConfirm) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const hashedPasswordUserData = {
            ...userData,
            password: hashedPassword,
        };
        return await this.authOutboundPort.signUp(hashedPasswordUserData);
    }

    async signIn(logInData: RequestOfSignIn): Promise<{ accessToken: string }> {
        const { userId, password } = logInData;
        const user = await this.authOutboundPort.validateUser(userId);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('아이디 비밀번호를 확인해주세요!');
        }

        const payload = { sub: user.id, username: user.name };
        const accessToken = this.jwtOutboundPort.sign(payload);

        return { accessToken };
    }

    async validateUser(userData: RequestOfSignIn) {
        const { userId, password } = userData;

        const findMemberByUserId = await this.authOutboundPort.validateUser(userId);
        if (findMemberByUserId.length === 0) {
            throw new UnauthorizedException('해당 계정이 없습니다');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, findMemberByUserId.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('아이디 비밀번호를 확인해주세요!');
        }
        return findMemberByUserId;
    }

    async findId(findIdData: RequestOfFind) {
        const { name, email } = findIdData;
        const validateUserByName = await this.authOutboundPort.validateUserByName(name, email);
        console.log('=>(auth.service.ts:69) validateUserByName', validateUserByName);

        if (!!_.isNil(validateUserByName)) {
            throw new NotFoundException('이름과 이메일의 계정이 존재하지 않아요');
        }

        return new ResponseFindIdDto(validateUserByName);
    }

    async checkValidate(requestOfFind: RequestOfFind) {
        const { userId, email, name } = requestOfFind;
        const validateResult = await this.authOutboundPort.checkValidate(userId, email, name);
        if (!_.size(validateResult)) {
            throw new NotFoundException('해당 정보의 아이디가 없슴둥');
        }
        return { result: true };
    }

    async resetPassword(requestOfFind: RequestOfFind) {
        const { userId, name, email } = requestOfFind;

        const findMemberDataByRequest = await this.authOutboundPort.checkValidate(userId, email, name);

        if (_.size(findMemberDataByRequest) <= 0) {
            throw new NotFoundException('해당 계정의 정보가 없습니다');
        }

        const { id } = findMemberDataByRequest;

        const resetPassword = dayjs().unix().toString();

        const resetHashedPassword = await bcrypt.hash(resetPassword, 10);

        await this.mailerOutboundPort.sendEmailOfResetPassword(email, resetPassword);

        const resetPasswordResult = await this.authOutboundPort.resetPassword(id, resetHashedPassword);

        if (_.size(resetPasswordResult) <= 0) {
            throw new BadRequestException('비밀번호 초기화 실패');
        }

        return { result: true };
    }
}

import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { AUTH_OUTBOUND_PORT, AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../types/auth.types';
import { JWT_OUTBOUND_PORT, JwtOutboundPort } from '../../jwt/outbound-port/jwt.outbound-port';
import _ from 'lodash';
import dayjs from 'dayjs';
import { MAILER_OUTBOUND_PORT, MailerOutboundPort } from '../../mailer/outbound-port/mailer.outbound-port';
import { Member } from '@prisma/client';
import { ResponseSignInClassDto } from '../dtos/response_signIn_class.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseBooleanDto } from '../dtos/response_check_validate_class.dto';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { RequestSignInDto } from '../dtos/request_signIn.dto';

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

    async signUp(userData: RequestSignupDto): Promise<Member> {
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

    async signIn(logInData: RequestSignInDto): Promise<ResponseSignInClassDto> {
        const { userId, password } = logInData;
        const user = await this.authOutboundPort.validateUser(userId);

        if (!user) {
            throw new UnauthorizedException('해당 ID가진 유저가 없습니다');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('아이디 비밀번호를 확인해주세요!');
        }

        const payload: JwtPayload = {
            sub: user.id,
            username: user.name,
            userId: user.userId,
        };
        const accessToken: string = this.jwtOutboundPort.sign(payload);

        return { accessToken };
    }

    async validateUser(userData: RequestValidateDto): Promise<Member> {
        const { userId, password } = userData;

        const findMemberByUserId: Member = await this.authOutboundPort.validateUser(userId);
        if (_.size(findMemberByUserId) === 0) {
            throw new UnauthorizedException('해당 계정이 없습니다');
        }

        const isPasswordValidated: boolean = await bcrypt.compare(password, findMemberByUserId.password);
        if (!isPasswordValidated) {
            throw new UnauthorizedException('아이디 비밀번호를 확인해주세요!');
        }
        return findMemberByUserId;
    }

    async findId(findIdData: RequestFindDto): Promise<Member> {
        const { name, email } = findIdData;
        const validateUserByName = await this.authOutboundPort.validateUserByName(name, email);

        if (!!_.isNil(validateUserByName)) {
            throw new NotFoundException('이름과 이메일의 계정이 존재하지 않아요');
        }

        return validateUserByName;
    }

    async checkValidate(requestOfFind: RequestFindDto): Promise<ResponseBooleanDto> {
        const { userId, email, name } = requestOfFind;
        const validateResult = await this.authOutboundPort.checkValidate(userId, email, name);
        if (!_.size(validateResult)) {
            throw new NotFoundException('해당 정보의 아이디가 없슴둥');
        }
        return { result: true };
    }

    async resetPassword(requestOfFind: RequestFindDto): Promise<ResponseBooleanDto> {
        const { userId, name, email } = requestOfFind;

        const findMemberDataByRequest: Member = await this.authOutboundPort.checkValidate(userId, email, name);

        if (_.size(findMemberDataByRequest) <= 0) {
            throw new NotFoundException('해당 계정의 정보가 없습니다');
        }

        const { id } = findMemberDataByRequest;

        const resetPassword: string = `${dayjs().unix().toString()}!PASSWORD`;

        const resetHashedPassword: string = await bcrypt.hash(resetPassword, 10);

        await this.mailerOutboundPort.sendEmailOfResetPassword(email, resetPassword);

        const resetPasswordResult: Member = await this.authOutboundPort.resetPassword(id, resetHashedPassword);

        if (_.size(resetPasswordResult) <= 0) {
            throw new BadRequestException('비밀번호 초기화 실패');
        }

        return { result: true };
    }
}

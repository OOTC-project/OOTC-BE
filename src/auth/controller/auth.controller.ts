import { Body, ConflictException, Controller, Get, HttpStatus, Inject, Post, Query } from '@nestjs/common';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { ResponseSignupDto } from '../dtos/response_signup.dto';
import { RequestSignInDto } from '../dtos/request_signIn.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseFindIdDto } from '../dtos/response_findId.dto';
import { RequestResetPasswordDto } from '../dtos/request_reset_password.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseSignUpClassDto } from '../dtos/response_signUp_class.dto';
import { ErrorResponse } from '../../common/decorator/ErrorResponse.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {}

    @Post('signUp')
    @ApiOperation({ summary: '유저 회원가입', description: '유저 회원가입을 진행한다' })
    @ApiBody({ type: RequestSignupDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseSignUpClassDto,
            exampleDescription: '회원가입 완료',
            exampleTitle: '회원가입 완료',
        },
    ])
    @ErrorResponse(HttpStatus.CONFLICT, [
        {
            model: ConflictException,
            exampleDescription: '이미 겹치는 값이 있을때',
            exampleTitle: '겹치는 아이디의 값이 있을때',
            message: 'Member_userId_key 유니크 제약 조건이 실패했습니다.',
        },
    ])
    async signUp(@Body() userData: RequestSignupDto): Promise<ResponseSignupDto> {
        const signUpData = await this.authInboundPort.signUp(userData);
        return new ResponseSignupDto(signUpData);
    }

    @Post('signIn')
    async signIn(@Body() logInData: RequestSignInDto) {
        console.log('=>(auth.controller.ts:28) logInData', logInData);
        return await this.authInboundPort.signIn(logInData);
    }

    @Post('validate')
    async validate(@Body() validateData: RequestValidateDto) {
        return await this.authInboundPort.validateUser(validateData);
    }

    @Get('find/id')
    async findId(@Query() findIdData: RequestFindDto): Promise<ResponseFindIdDto> {
        const findId = await this.authInboundPort.findId(findIdData);
        console.log('=>(auth.controller.ts:40) findId', findId);
        return new ResponseFindIdDto(findId);
    }

    @Get('check/validate')
    async findPassword(@Query() findPasswordData: RequestFindDto): Promise<boolean> {
        return await this.authInboundPort.checkValidate(findPasswordData);
    }

    @Post('resetPassword')
    async resetPassword(@Body() resetPasswordData: RequestResetPasswordDto) {
        return await this.authInboundPort.resetPassword(resetPasswordData);
    }
}

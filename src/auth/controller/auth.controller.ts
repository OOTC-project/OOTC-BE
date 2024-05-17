import { Body, Controller, Get, Inject, Post, Query, UploadedFiles } from '@nestjs/common';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { UploadToS3 } from '../../common/decorator';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import { ResponseSignupDto } from '../dtos/response_signup.dto';
import { RequestSignInDto } from '../dtos/request_signIn.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseFindIdDto } from '../dtos/response_findId.dto';
import { RequestResetPasswordDto } from '../dtos/request_reset_password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {}

    @Post('signUp')
    @UploadToS3([{ name: 'profileImg' }, { name: 'backgroundImg' }])
    async signUp(@Body() userData: RequestSignupDto, @UploadedFiles() files: AWSS3Type): Promise<ResponseSignupDto> {
        const signUpData = await this.authInboundPort.signUp(userData, files);
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

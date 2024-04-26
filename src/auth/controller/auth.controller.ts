import { Body, Controller, Inject, Post, UploadedFiles } from '@nestjs/common';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { UploadToS3 } from '../../common/decorator';
import { AWSS3Type } from '../../common/type/aws_s3.type';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {}

    @Post('signUp')
    @UploadToS3([{ name: 'profileImg' }, { name: 'backgroundImg' }])
    async signUp(@Body() userData: RequestSignupDto, @UploadedFiles() files: AWSS3Type) {
        return await this.authInboundPort.signUp(userData, files);
    }
}

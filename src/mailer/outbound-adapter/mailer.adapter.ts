import { Injectable } from '@nestjs/common';
import { MailerOutboundPort } from '../outbound-port/mailer.outbound-port';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerAdapter implements MailerOutboundPort {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmailOfResetPassword(email: string, resetPassword: string) {
        return this.mailerService.sendMail({
            to: email,
            subject: 'OOTC 초기화 비밀번호 입니다.',
            text: `OOTC 초기화 비밀번호는
            
            
            ${resetPassword}
            
            입니다!`,
        });
    }
}

import { Controller, Get, Post } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    async signUp() {
        return this.memberService.signUp();
    }

    @Get()
    async signIn() {
        return this.memberService.signIn();
    }
}

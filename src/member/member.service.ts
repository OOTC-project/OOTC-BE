import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
    constructor() {}

    async signUp() {
        return 'getMember';
    }

    async signIn() {
        return 'signIn';
    }
}

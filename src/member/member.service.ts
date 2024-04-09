import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
    constructor() {}

    async getMember() {
        return 'getMember';
    }
}

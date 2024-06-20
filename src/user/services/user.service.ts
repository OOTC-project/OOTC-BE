import { Inject, Injectable } from '@nestjs/common';
import { UserInboundPort } from '../inbound-port/user.inbound-port';
import { USER_OUTBOUND_PORT, UserOutboundPort } from '../outbound-port/user.outbound-port';
import { Member } from '@prisma/client';
import { RequestUpdateUserDto } from '../dtos/request_update_user.dto';

@Injectable()
export class UserService implements UserInboundPort {
    constructor(
        @Inject(USER_OUTBOUND_PORT)
        private readonly userOutboundPort: UserOutboundPort,
    ) {}

    async findInformationOfUser(user: Member): Promise<Member> {
        return this.userOutboundPort.findInformationOfUser(user);
    }

    async update(user: Member, userUpdate: RequestUpdateUserDto): Promise<Member> {
        return this.userOutboundPort.update(user, userUpdate);
    }
}

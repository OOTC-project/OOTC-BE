import { Member } from '@prisma/client';
import { RequestUpdateUserDto } from '../dtos/request_update_user.dto';

export const USER_INBOUND_PORT = 'USER_INBOUND_PORT' as const;

export interface UserInboundPort {
    findInformationOfUser(user: Member): Promise<Member>;

    update(user: Member, userUpdate: RequestUpdateUserDto): Promise<Member>;
}

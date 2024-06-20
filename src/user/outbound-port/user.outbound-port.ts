import { Member } from '@prisma/client';
import { RequestUpdateUserDto } from '../dtos/request_update_user.dto';

export const USER_OUTBOUND_PORT = 'USER_OUTBOUND_PORT' as const;

export interface UserOutboundPort {
    findInformationOfUser(user: Member): Promise<Member>;

    update(user: Member, userUpdate: RequestUpdateUserDto): Promise<Member>;
}

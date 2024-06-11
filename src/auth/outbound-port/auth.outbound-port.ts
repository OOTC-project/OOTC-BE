import { Member } from '@prisma/client';
import { RequestSignupDto } from '../dtos/request_signup.dto';

export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export interface AuthOutBoundPort {
    signUp(userData: RequestSignupDto): Promise<Member>;

    validateUser(userid: string): Promise<Member>;

    validateUserByName(name: string, email: string): Promise<Member>;

    checkValidate(userId: string, email: string, name: string): Promise<Member>;

    resetPassword(id: number, resetPassword: string): Promise<Member>;
}

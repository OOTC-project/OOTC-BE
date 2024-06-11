import { RequestOfSignUp } from '../types/auth.types';
import { Member } from '@prisma/client';

export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export interface AuthOutBoundPort {
    signUp(userData: RequestOfSignUp): Promise<Member>;

    validateUser(userid: string): Promise<Member>;

    validateUserByName(name: string, email: string): Promise<Member>;

    checkValidate(userId: string, email: string, name: string): Promise<Member>;

    resetPassword(id: number, resetPassword: string): Promise<Member>;
}

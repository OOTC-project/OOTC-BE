import { RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export interface AuthOutBoundPort {
    signUp(userData: RequestOfSignUp): Promise<ResponseOfSignUp>;

    validateUser(userid: string);

    validateUserByName(name: string, email: string);

    checkValidate(userId: string, email: string, name: string);

    resetPassword(id: number, hashedPassword: string);
}

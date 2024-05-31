import { RequestOfFind, RequestOfSignIn, RequestOfSignUp, RequestOfValidate, ResponseOfSignUp } from '../types/auth.types';

export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export interface AuthInboundPort {
    signUp(userData: RequestOfSignUp): Promise<ResponseOfSignUp>;

    signIn(userData: RequestOfSignIn);

    validateUser(userData: RequestOfValidate);

    findId(findIdData: RequestOfFind);

    checkValidate(findPasswordData: RequestOfFind);

    resetPassword(requestFindDto: RequestOfFind);
}

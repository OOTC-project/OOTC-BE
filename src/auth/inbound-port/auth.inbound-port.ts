import { AWSS3Type } from '../../common/type/aws_s3.type';
import { RequestOfFind, RequestOfResetPassword, RequestOfSignIn, RequestOfSignUp, RequestOfValidate, ResponseOfSignUp } from '../types/auth.types';

export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export interface AuthInboundPort {
    signUp(userData: RequestOfSignUp, files: AWSS3Type): Promise<ResponseOfSignUp>;

    signIn(userData: RequestOfSignIn);

    validateUser(userData: RequestOfValidate);

    findId(findIdData: RequestOfFind);

    checkValidate(findPasswordData: RequestOfFind);

    resetPassword(resetPasswordData: RequestOfResetPassword);
}

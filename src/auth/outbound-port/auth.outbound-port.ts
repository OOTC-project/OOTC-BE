import { AWSS3Type } from '../../common/type/aws_s3.type';
import { RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export interface AuthOutBoundPort {
    signUp(userData: RequestOfSignUp, files: AWSS3Type): Promise<ResponseOfSignUp>;

    signIn(userData: RequestOfSignUp);

    validateUser(userid: string, password: string);
}

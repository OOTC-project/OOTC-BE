import { AWSS3Type } from '../../common/type/aws_s3.type';

export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export type RequestOfSignIn = {
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
};

export interface AuthInboundPort {
    signUp(userData: RequestOfSignIn, files: AWSS3Type);
}

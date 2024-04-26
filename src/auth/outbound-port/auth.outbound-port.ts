import { AWSS3Type } from '../../common/type/aws_s3.type';

export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export type RequestOfSignIn = {
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
};

export type ResponseOfSignIn = {
    id: number;
    name: string;
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    isWithdrawal: boolean;
    createdAt: string | Date;
};

export interface AuthOutBoundPort {
    signIn(userData: RequestOfSignIn, files: AWSS3Type): Promise<ResponseOfSignIn>;
}

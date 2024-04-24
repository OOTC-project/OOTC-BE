export const AUTH_OUTBOUND_PORT = 'AUTH_OUTBOUND_PORT' as const;

export type RequestOfSignIn = {
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
};

export interface AuthOutBoundPort {
    signIn(userData: RequestOfSignIn);
}

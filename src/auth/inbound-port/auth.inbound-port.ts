export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export type RequestOfSignIn = {
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
};

export interface AuthInboundPort {
    signUp(userData: RequestOfSignIn, files: { profileImg?: Express.Multer.File[]; backgroundImg?: Express.Multer.File[] });
}

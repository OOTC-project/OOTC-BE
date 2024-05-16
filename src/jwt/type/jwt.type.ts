export type JwtRegisterType = {
    secret: string;
    signOptions: JwtSignOptionsType;
};

type JwtSignOptionsType = {
    expiresIn: string;
};

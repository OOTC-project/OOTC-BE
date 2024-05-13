export type RequestOfSignUp = {
    userId: string;
    password: string;
    passwordConfirm: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
};

export type RequestOfSignIn = {
    userId: string;
    password: string;
};

export type ResponseOfSignUp = {
    id: number;
    name: string;
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    isWithdrawal: boolean;
    createdAt: string | Date;
};

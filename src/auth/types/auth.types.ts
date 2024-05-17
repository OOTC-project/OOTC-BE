export type RequestOfSignUp = {
    userId: string;
    password: string;
    passwordConfirm: string;
    profileImg: string;
    backgroundImg: string;
    name: string;
    email: string;
};

export type RequestOfSignIn = {
    userId: string;
    password: string;
};

export type RequestOfValidate = {
    userId: string;
};

export type RequestOfFind = {
    name: string;
    email: string;
    userId?: string;
};

export type RequestOfResetPassword = {
    id: number;
    password: string;
    passwordConfirm: string;
};

// response

export type ResponseOfSignUp = {
    id: number;
    name: string;
    userId: string;
    password: string;
    profileImg: string;
    backgroundImg: string;
    email: string;
    isWithdrawal: boolean;
    createdAt: string | Date;
};

export type ResponseOfFindId = {
    userId: string;
};

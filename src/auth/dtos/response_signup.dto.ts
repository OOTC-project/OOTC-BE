import { ResponseOfSignUp } from '../types/auth.types';

export class ResponseSignupDto {
    id: number;
    name: string;
    userId: string;
    isWithdrawal: boolean;
    createdAt: string | Date;

    constructor(responseOfSignIn: ResponseOfSignUp) {
        this.id = responseOfSignIn.id;
        this.name = responseOfSignIn.name;
        this.userId = responseOfSignIn.userId;
        this.isWithdrawal = responseOfSignIn.isWithdrawal;
        this.createdAt = responseOfSignIn.createdAt;
    }
}

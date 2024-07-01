export class ResponseSignupDto {
    id: number;
    name: string;
    userId: string;
    isWithdrawal: boolean;
    createdAt: string | Date;

    constructor(responseOfSignUp: ResponseSignupDto) {
        this.id = responseOfSignUp.id;
        this.name = responseOfSignUp.name;
        this.userId = responseOfSignUp.userId;
        this.isWithdrawal = responseOfSignUp.isWithdrawal;
        this.createdAt = responseOfSignUp.createdAt;
    }
}

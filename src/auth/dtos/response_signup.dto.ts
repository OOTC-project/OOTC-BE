import { ResponseOfSignIn } from '../outbound-port/auth.outbound-port';
import { s3ImageUrlFunction } from '../../common/function/s3_imageUrl.function';

export class ResponseSignupDto {
    id: number;
    name: string;
    userId: string;
    profileImg: string;
    backgroundImg: string;
    isWithdrawal: boolean;
    createdAt: string | Date;

    constructor(responseOfSignIn: ResponseOfSignIn) {
        this.id = responseOfSignIn.id;
        this.name = responseOfSignIn.name;
        this.userId = responseOfSignIn.userId;
        this.profileImg = s3ImageUrlFunction(responseOfSignIn.profileImg);
        this.backgroundImg = s3ImageUrlFunction(responseOfSignIn.backgroundImg);
        this.isWithdrawal = responseOfSignIn.isWithdrawal;
        this.createdAt = responseOfSignIn.createdAt;
    }
}
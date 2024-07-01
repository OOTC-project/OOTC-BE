import { Member } from '@prisma/client';
import { ResponseSignInClassDto } from '../dtos/response_signIn_class.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseBooleanDto } from '../dtos/response_check_validate_class.dto';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { RequestSignInDto } from '../dtos/request_signIn.dto';
import { ResponseSignupDto } from '../dtos/response_signup.dto';

export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export interface AuthInboundPort {
    signUp(userData: RequestSignupDto): Promise<ResponseSignupDto>;

    signIn(userData: RequestSignInDto): Promise<ResponseSignInClassDto>;

    validateUser(userData: RequestValidateDto): Promise<Member>;

    findId(findIdData: RequestFindDto): Promise<Member>;

    checkValidate(findPasswordData: RequestFindDto): Promise<ResponseBooleanDto>;

    resetPassword(requestFindDto: RequestFindDto): Promise<ResponseBooleanDto>;
}

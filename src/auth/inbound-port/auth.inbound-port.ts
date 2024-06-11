import { RequestOfSignIn, RequestOfSignUp } from '../types/auth.types';
import { Member } from '@prisma/client';
import { ResponseSignInClassDto } from '../dtos/response_signIn_class.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseBooleanDto } from '../dtos/response_check_validate_class.dto';

export const AUTH_INBOUND_PORT = 'AUTH_INBOUND_PORT' as const;

export interface AuthInboundPort {
    signUp(userData: RequestOfSignUp): Promise<Member>;

    signIn(userData: RequestOfSignIn): Promise<ResponseSignInClassDto>;

    validateUser(userData: RequestValidateDto): Promise<Member>;

    findId(findIdData: RequestFindDto): Promise<Member>;

    checkValidate(findPasswordData: RequestFindDto): Promise<ResponseBooleanDto>;

    resetPassword(requestFindDto: RequestFindDto): Promise<ResponseBooleanDto>;
}

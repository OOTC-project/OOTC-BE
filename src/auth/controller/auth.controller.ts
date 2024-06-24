import { BadRequestException, Body, ConflictException, Controller, Get, HttpStatus, Inject, NotFoundException, Patch, Post, Query } from '@nestjs/common';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { ResponseSignupDto } from '../dtos/response_signup.dto';
import { RequestSignInDto } from '../dtos/request_signIn.dto';
import { RequestFindDto } from '../dtos/request_findId.dto';
import { ResponseFindIdDto } from '../dtos/response_findId.dto';
import { ApiBody, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseSignUpClassDto } from '../dtos/response_signUp_class.dto';
import { SimpleErrorResponse } from '../../common/decorator/ErrorResponse.decorator';
import { ResponseSignInClassDto } from '../dtos/response_signIn_class.dto';
import { ResponseFindIdClassDto } from '../dtos/response_findId_class.dto';
import { ResponseBooleanDto } from '../dtos/response_check_validate_class.dto';
import { RequestValidateDto } from '../dtos/request_validate.dto';
import { Member } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_INBOUND_PORT)
        private readonly authInboundPort: AuthInboundPort,
    ) {}

    @Post('signUp')
    @ApiOperation({ summary: '유저 회원가입', description: '유저 회원가입을 진행한다' })
    @ApiBody({ type: RequestSignupDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseSignUpClassDto,
            exampleDescription: '회원가입 완료',
            exampleTitle: '회원가입 완료',
        },
    ])
    @SimpleErrorResponse(HttpStatus.CONFLICT, [
        {
            model: ConflictException,
            exampleDescription: '이미 겹치는 값이 있을때',
            exampleTitle: '겹치는 아이디의 값이 있을때',
            message: 'Member_userId_key 유니크 제약 조건이 실패했습니다.',
        },
    ])
    @SimpleErrorResponse(HttpStatus.BAD_REQUEST, [
        {
            model: BadRequestException,
            exampleTitle: '비밀번호와 비밀번호 확인이 안맞을때',
            exampleDescription: '비밀번호와 비밀번호 확인이 안맞을때',
            message: 'Passwords do not match',
        },
        {
            model: BadRequestException,
            exampleDescription: '비밀번호에 대문자 없을때',
            exampleTitle: '비밀번호 대문자 조건',
            message: '비밀번호에는 하나 이상의 대문자가 포함되어야 합니다',
        },
        {
            model: BadRequestException,
            exampleDescription: '비밀번호에 특수문자 없을때',
            exampleTitle: '비밀번호 특수문자 조건',
            message: '비밀번호에는 하나 이상의 특수문자가 포함되어야 합니다',
        },
        {
            model: BadRequestException,
            exampleDescription: '비밀번호에 최소자리는 6자리',
            exampleTitle: '비밀번호 최소자리조건',
            message: '비밀번호는 최소 6자 이상이어야 합니다',
        },
        {
            model: BadRequestException,
            exampleDescription: '비밀번호에 최댜자리는 20자리',
            exampleTitle: '비밀번호 최대자리조건',
            message: '비밀번호는 최대 20자 이하여야 합니다',
        },
    ])
    async signUp(@Body() userData: RequestSignupDto): Promise<ResponseSignupDto> {
        const signUpData: ResponseSignupDto = await this.authInboundPort.signUp(userData);
        return new ResponseSignupDto(signUpData);
    }

    @Post('signIn')
    @ApiOperation({ summary: '유저 로그인', description: '유저 로그인을 진행한다' })
    @ApiBody({ type: RequestSignInDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseSignInClassDto,
            exampleDescription: '로그인 성공',
            exampleTitle: '로그인성공',
        },
    ])
    @SimpleErrorResponse(HttpStatus.BAD_REQUEST, [
        {
            model: BadRequestException,
            exampleDescription: '아이디 혹은 비밀번호가 틀린경우',
            exampleTitle: '아이디 혹은 비밀번호가 틀렸다',
            message: 'Invalid credentials',
        },
    ])
    async signIn(@Body() logInData: RequestSignInDto): Promise<ResponseSignInClassDto> {
        return await this.authInboundPort.signIn(logInData);
    }

    @Post('validate')
    @ApiExcludeEndpoint()
    async validate(@Body() validateData: RequestValidateDto): Promise<Member> {
        return await this.authInboundPort.validateUser(validateData);
    }

    @Post('find/id')
    @ApiOperation({ summary: '유저 아이디찾기', description: '유저 아이디 찾기 진행' })
    @ApiBody({ type: RequestFindDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindIdClassDto,
            exampleDescription: '아이디 찾기 성공',
            exampleTitle: '아이디 찾기 성공',
        },
    ])
    @SimpleErrorResponse(HttpStatus.NOT_FOUND, [
        {
            exampleDescription: '아이디 찾기 실패',
            exampleTitle: '정보에 대한 계정이 없음',
            model: NotFoundException,
            message: '이름과 이메일의 계정이 존재하지 않아요',
        },
    ])
    async findId(@Body() findIdData: RequestFindDto): Promise<ResponseFindIdDto> {
        const validateUserByName = await this.authInboundPort.findId(findIdData);

        return new ResponseFindIdDto(validateUserByName);
    }

    @Get('check/validate')
    @ApiOperation({ summary: '해당 정보의 유저 존재 유무를 파악한다', description: '유저 벨리데이션' })
    @SuccessResponse(HttpStatus.OK, [
        {
            exampleDescription: '해당정보로 계정 존재 유무를 파악한다',
            exampleTitle: '계정 존재 유무 판단',
            model: ResponseBooleanDto,
        },
    ])
    @SimpleErrorResponse(HttpStatus.NOT_FOUND, [
        {
            exampleDescription: '해당 정보의 계정이 없는경우',
            exampleTitle: '해당 정보 계정 없음',
            message: '해당 정보의 아이디가 없슴둥',
            model: NotFoundException,
        },
    ])
    async checkValidate(@Query() findPasswordData: RequestFindDto): Promise<ResponseBooleanDto> {
        return await this.authInboundPort.checkValidate(findPasswordData);
    }

    @Patch('reset/password')
    @ApiOperation({
        summary: '초기화된 비밀번호를 유저 메일로 받는다',
        description: '유저 확인이 되면, 유저 메일로 초기화된 비밀번호를 전송하고 DB의 password를 수정한다',
    })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseBooleanDto,
            exampleTitle: '비밀번호 초기화 응답',
            exampleDescription: '비밀번호 초기화 응답 결과 - 비밀번호는 회원가입한 메일로 전송된다',
        },
    ])
    @SimpleErrorResponse(HttpStatus.NOT_FOUND, [
        {
            exampleDescription: '해당 정보의 계정이 없는경우',
            exampleTitle: '해당 정보 계정 없음',
            message: '해당 계정의 정보가 없습니다',
            model: NotFoundException,
        },
    ])
    async resetPassword(@Body() requestFindDto: RequestFindDto): Promise<ResponseBooleanDto> {
        return this.authInboundPort.resetPassword(requestFindDto);
    }
}

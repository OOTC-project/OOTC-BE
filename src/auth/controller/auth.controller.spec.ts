import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { ResponseSignupDto } from '../dtos/response_signup.dto';
import { BadRequestException, ConflictException, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('AuthController', () => {
    let authController: AuthController;
    let authInboundPort: AuthInboundPort;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AUTH_INBOUND_PORT,
                    useValue: {
                        signUp: jest.fn(),
                        signIn: jest.fn(),
                        validateUser: jest.fn(),
                        findId: jest.fn(),
                        checkValidate: jest.fn(),
                        reseetPassword: jest.fn(),
                    },
                },
                {
                    provide: APP_PIPE,
                    useValue: new ValidationPipe({
                        transform: true, // 요청 객체를 DTO 클래스 인스턴스로 자동 변환합니다. 이를 통해 컨트롤러에서 타입 검사를 할 수 있게 됩니다.
                        forbidNonWhitelisted: true, // 요청 객체에 DTO에 정의되지 않은 속성이 포함된 경우 예외를 발생시킵니다. 이는 잘못된 속성이나 허용되지 않은 데이터를 포함한 요청을 차단하는 데 유용합니다.
                        whitelist: true, // DTO에 정의된 속성만 요청 객체에 남기고 나머지는 제거합니다. 즉, DTO에 명시되지 않은 속성이 요청에 포함되어 있다면 이를 자동으로 제거합니다.
                    }),
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authInboundPort = module.get<AuthInboundPort>(AUTH_INBOUND_PORT);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('signUp', () => {
        const requestSignUpDto: RequestSignupDto = {
            userId: 'cutestar12',
            password: 'cutestaR12@',
            passwordConfirm: 'cutestaR12@',
            name: '제스트',
            email: 'jest@test.com',
        };

        it('회원가입 성공', async () => {
            const responseSignUpDto: ResponseSignupDto = {
                id: 1,
                name: '제스트',
                userId: 'cutestar12',
                isWithdrawal: false,
                createdAt: new Date(),
            };

            jest.spyOn(authInboundPort, 'signUp').mockResolvedValue(responseSignUpDto);

            expect(await authController.signUp(requestSignUpDto)).toEqual(responseSignUpDto);
        });

        it('비밀번호와 비밀번호 확인이 일치하지 않을 때', async () => {
            const invalidRequestSignUpDto = {
                ...requestSignUpDto,
                passwordConfirm: 'differentPassword',
            };

            await expect(authController.signUp(invalidRequestSignUpDto)).rejects.toThrow(BadRequestException);
        });

        it('이미 DB에 겹치는 값이 있을 때', async () => {
            const conflictError = new ConflictException('유니크 제약 조건이 실패했습니다. 중복된 값이 존재합니다.');

            jest.spyOn(authInboundPort, 'signUp').mockRejectedValue(conflictError);

            await expect(authController.signUp(requestSignUpDto)).rejects.toThrow(ConflictException);
        });

        it('비밀번호에 대문자가 없을때', async () => {
            const passwordOfNotCapitalWord = {
                ...requestSignUpDto,
                password: '123123cutestar!',
                passwordConfirm: '123123cutestar!',
            };

            await expect(authController.signUp(passwordOfNotCapitalWord)).rejects.toThrow(BadRequestException);
        });
    });
});

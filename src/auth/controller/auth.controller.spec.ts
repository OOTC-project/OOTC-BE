import { BadRequestException, ConflictException, ValidationPipe } from '@nestjs/common';
import { ResponseSignupDto } from '../dtos/response_signup.dto';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { AuthController } from './auth.controller';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

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
                        transform: true,
                        forbidNonWhitelisted: true,
                        whitelist: true,
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

            jest.spyOn(authInboundPort, 'signUp').mockImplementation(() => {
                throw new BadRequestException('Passwords do not match');
            });

            await expect(authController.signUp(invalidRequestSignUpDto)).rejects.toThrow(BadRequestException);
        });

        it('이미 DB에 겹치는 값이 있을 때', async () => {
            const conflictError = new ConflictException('유니크 제약 조건이 실패했습니다. 중복된 값이 존재합니다. -${fields.modelName}의 ${fields.target}가 이미 있습니다');

            jest.spyOn(authInboundPort, 'signUp').mockRejectedValue(conflictError);

            await expect(authController.signUp(requestSignUpDto)).rejects.toThrow(ConflictException);
        });

        it('비밀번호에 대문자가 없을때', async () => {
            const passwordOfNotCapitalWord = {
                ...requestSignUpDto,
                password: '123123cutestar!',
                passwordConfirm: '123123cutestar!',
            };

            jest.spyOn(authInboundPort, 'signUp').mockImplementation(() => {
                throw new BadRequestException('비밀번호에는 하나 이상의 대문자가 포함되어야 합니다');
            });

            await expect(authController.signUp(passwordOfNotCapitalWord)).rejects.toThrow(BadRequestException);
        });
    });
});

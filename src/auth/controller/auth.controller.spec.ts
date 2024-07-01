import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AUTH_INBOUND_PORT, AuthInboundPort } from '../inbound-port/auth.inbound-port';
import { RequestSignupDto } from '../dtos/request_signup.dto';
import { ResponseSignupDto } from '../dtos/response_signup.dto';

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
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authInboundPort = module.get<AuthInboundPort>(AUTH_INBOUND_PORT);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('signUp', () => {
        it('회원가입 성공', async () => {
            const requestSignUpDto: RequestSignupDto = {
                userId: 'cutestar12',
                password: 'cutestaR12@',
                passwordConfirm: 'cutestaR12@',
                name: '제스트',
                email: 'jest@test.com',
            };

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
    });
});

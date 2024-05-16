import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import { RequestOfSignIn, RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(userData: RequestOfSignUp, files: AWSS3Type): Promise<ResponseOfSignUp> {
        const { userId, password, name } = userData;
        const { profileImg, backgroundImg } = files;

        return this.prisma.member.create({
            data: {
                userId,
                password,
                profileImg: profileImg[0].originalname,
                backgroundImg: backgroundImg[0].originalname,
                name,
            },
        });
    }

    async signIn(userData: RequestOfSignIn) {}

    async validateUser(userId: string, password: string) {
        return this.prisma.member.findUnique({
            where: { userId },
        });
    }
}

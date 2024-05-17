import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import { RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(userData: RequestOfSignUp, files: AWSS3Type): Promise<ResponseOfSignUp> {
        const { userId, password, name, email } = userData;
        const { profileImg, backgroundImg } = files;

        return this.prisma.member.create({
            data: {
                email,
                userId,
                password,
                profileImg: profileImg[0].originalname,
                backgroundImg: backgroundImg[0].originalname,
                name,
            },
        });
    }

    async validateUser(userId: string) {
        return this.prisma.member.findUnique({
            where: { userId },
        });
    }

    async validateUserByName(name: string, email: string) {
        return this.prisma.member.findFirst({
            where: { name, email },
        });
    }

    async checkValidate(userId: string, email: string, name: string) {
        return this.prisma.member.findFirst({
            where: { userId, email, name },
        });
    }

    async resetPassword(id: number, hashedPassword: string) {
        return this.prisma.member.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
}

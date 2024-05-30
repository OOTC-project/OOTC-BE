import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestOfSignUp, ResponseOfSignUp } from '../types/auth.types';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(userData: RequestOfSignUp): Promise<ResponseOfSignUp> {
        const { userId, password, name, email } = userData;

        return this.prisma.member.create({
            data: {
                email,
                userId,
                password,
                name,
                profileImg: null,
                backgroundImg: null,
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

import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { Member } from '@prisma/client';
import { RequestSignupDto } from '../dtos/request_signup.dto';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signUp(userData: RequestSignupDto): Promise<Member> {
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

    async validateUser(userId: string): Promise<Member> {
        return this.prisma.member.findFirst({
            where: { userId },
        });
    }

    async validateUserByName(name: string, email: string): Promise<Member> {
        return this.prisma.member.findFirst({
            where: { name, email },
        });
    }

    async checkValidate(userId: string, email: string, name: string): Promise<Member> {
        return this.prisma.member.findFirst({
            where: { userId, email, name },
        });
    }

    async resetPassword(id: number, resetPassword: string): Promise<Member> {
        return this.prisma.member.update({
            where: { id },
            data: { password: resetPassword },
        });
    }
}

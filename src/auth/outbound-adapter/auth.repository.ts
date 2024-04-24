import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort, RequestOfSignIn } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signIn(userData: RequestOfSignIn) {
        const { userId, password, name, profileImg, backgroundImg } = userData;

        return this.prisma.member.create({
            data: {
                userId,
                password,
                profileImg,
                backgroundImg,
                name,
            },
        });
    }
}

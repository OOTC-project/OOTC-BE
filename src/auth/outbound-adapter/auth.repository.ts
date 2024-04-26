import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort, RequestOfSignIn, s3ImageUrlObject } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signIn(userData: RequestOfSignIn, files: s3ImageUrlObject) {
        const { userId, password, name } = userData;
        const { profileImg, backgroundImg } = files;

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

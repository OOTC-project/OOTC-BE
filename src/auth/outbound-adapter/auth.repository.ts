import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort, RequestOfSignIn } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signIn(userData: RequestOfSignIn, files: { profileImg?: Express.Multer.File[]; backgroundImg?: Express.Multer.File[] }) {
        const { userId, password, name, profileImg, backgroundImg } = userData;
        const { profileImg: profileImage, backgroundImg: backgroundImage } = files;

        return this.prisma.member.create({
            data: {
                userId,
                password,
                profileImg: profileImage,
                backgroundImg: backgroundImage,
                name,
            },
        });
    }
}

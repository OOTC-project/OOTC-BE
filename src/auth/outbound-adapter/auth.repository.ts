import { Injectable } from '@nestjs/common';
import { AuthOutBoundPort, RequestOfSignIn, ResponseOfSignIn } from '../outbound-port/auth.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { AWSS3Type } from '../../common/type/aws_s3.type';

@Injectable()
export class AuthRepository implements AuthOutBoundPort {
    constructor(private readonly prisma: PrismaService) {}

    async signIn(userData: RequestOfSignIn, files: AWSS3Type): Promise<ResponseOfSignIn> {
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
}

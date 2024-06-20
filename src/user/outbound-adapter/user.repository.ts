import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserOutboundPort } from '../outbound-port/user.outbound-port';
import { Member } from '@prisma/client';
import { RequestUpdateUserDto } from '../dtos/request_update_user.dto';
import _ from 'lodash';

@Injectable()
export class UserRepository implements UserOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async findInformationOfUser(user: Member): Promise<Member> {
        return this.prisma.member.findUnique({
            where: {
                id: user.id,
            },
        });
    }

    async update(user: Member, userUpdate: RequestUpdateUserDto): Promise<Member> {
        console.log('=>(user.repository.ts:21) userUpdate', userUpdate);
        return this.prisma.member.update({
            data: {
                name: userUpdate.name,
                email: userUpdate.email,
                profileImg: !!_.size(userUpdate['uploadedFiles'].profileImg) ? userUpdate['uploadedFiles'].profileImg.originalname : null,
                backgroundImg: !!_.size(userUpdate['uploadedFiles'].backgroundImg) ? userUpdate['uploadedFiles'].profileImg.originalname : null,
            },
            where: {
                id: user.id,
            },
        });
    }
}

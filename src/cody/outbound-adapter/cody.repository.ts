import { Injectable } from '@nestjs/common';
import { CodyOutboundPort } from '../outbound-port/cody.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import _ from 'lodash';

@Injectable()
export class CodyRepository implements CodyOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(user, createCody) {
        const createdCody = await this.prisma.cody.create({
            data: {
                name: createCody.name,
                fkMemberId: user.id,
            },
        });
        const dataForCreateCodyClothes = _.map(createCody.clothes, (clothesId) => {
            return {
                fkCodyId: createdCody.id,
                fkClothesId: clothesId,
            };
        });
        await this.prisma.codyClothes.createMany({
            data: dataForCreateCodyClothes,
        });
    }

    async findAll(user) {
        return this.prisma.codyClothes.findMany({
            include: {
                cody: true,
                clothes: true,
            },
            where: {
                clothes: {
                    fkMemberId: user.id,
                },
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.codyClothes.findFirst({
            where: {
                cody: {
                    id,
                },
            },
            include: {
                cody: true,
                clothes: true,
            },
        });
    }

    // async update(id: number, updateCody) {
    //     return this.prisma.codyClothes.update({
    //         where: {
    //             cody: {
    //                 id,
    //             },
    //         },
    //         data: {
    //             cody: {
    //                 name: updateCody.name,
    //             },
    //         },
    //         include: {
    //             cody: true,
    //             clothes: true,
    //         },
    //     });
    // }
}

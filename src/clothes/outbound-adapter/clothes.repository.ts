import { ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Clothes, Member } from '@prisma/client';
import { RequestCreateClothes } from '../interface/clothes.interface';
import { AWSS3Type } from '../../common/interface/base_column.interface';

@Injectable()
export class ClothesRepository implements ClothesOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(createClothes: RequestCreateClothes, files: AWSS3Type, user: Member): Promise<Clothes> {
        return this.prisma.clothes.create({
            data: {
                fkMemberId: user.id,
                clothesImg: files.clothesImg[0].originalname,
                fkCategoryId: createClothes.fkCategoryId,
                name: createClothes.name,
                description: createClothes.description,
                position: createClothes.position,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.clothes.findFirst({
            where: {
                id,
            },
        });
    }

    async update(id, updateClothes, files) {
        return this.prisma.clothes.update({
            where: {
                id,
            },
            data: {
                ...updateClothes,
                clothesImg: files.clothesImg[0].originalname,
            },
        });
    }

    async remove(id) {
        return this.prisma.clothes.delete({
            where: {
                id,
            },
        });
    }
}

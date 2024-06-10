import { Injectable } from '@nestjs/common';
import { CodyOutboundPort } from '../outbound-port/cody.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import _ from 'lodash';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';

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

    async update(id: number, updateCody: RequestUpdateCodyDto) {
        // 코디 이름 업데이트
        await this.prisma.cody.update({
            where: { id },
            data: { name: updateCody.name },
        });

        // 기존의 CodyClothes 삭제
        await this.prisma.codyClothes.deleteMany({
            where: { fkCodyId: id },
        });

        // 새로운 CodyClothes 추가
        const newCodyClothes = updateCody.clothes.map((clothesId) => ({
            fkCodyId: id,
            fkClothesId: clothesId,
        }));
        await this.prisma.codyClothes.createMany({
            data: newCodyClothes,
        });

        // 업데이트된 코디 반환
        return this.prisma.cody.findUnique({
            where: { id },
            include: {
                codyClothes: {
                    include: { clothes: true },
                },
            },
        });
    }

    async delete(id: number) {
        await this.prisma.codyClothes.deleteMany({
            where: {
                fkCodyId: id,
            },
        });

        await this.prisma.recommend.deleteMany({
            where: {
                fkCodyId: id,
            },
        });

        return this.prisma.cody.delete({
            where: {
                id,
            },
        });
    }
}

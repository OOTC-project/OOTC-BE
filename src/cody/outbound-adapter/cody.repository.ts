import { Injectable } from '@nestjs/common';
import { CodyOutboundPort } from '../outbound-port/cody.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';
import _ from 'lodash';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';
import { Cody, Member } from '@prisma/client';
import { RequestCreateCodyDto } from '../dtos/request_create_cody.dto';
import { CodyWithDetails } from '../types/cody.type';

@Injectable()
export class CodyRepository implements CodyOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(user: Member, createCody: RequestCreateCodyDto): Promise<CodyWithDetails> {
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

        return this.prisma.codyClothes.findFirst({
            where: {
                clothes: {
                    fkMemberId: user.id,
                },
                cody: {
                    id: createdCody.id,
                },
            },
            include: {
                clothes: true,
                cody: true,
            },
        }) as unknown as CodyWithDetails;
    }

    async findAll(user: Member): Promise<CodyWithDetails[]> {
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
        }) as unknown as CodyWithDetails[];
    }

    async findOne(id: number): Promise<CodyWithDetails | null> {
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
        }) as unknown as CodyWithDetails | null;
    }

    async update(id: number, updateCody: RequestUpdateCodyDto): Promise<CodyWithDetails> {
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
        }) as unknown as CodyWithDetails;
    }

    async delete(id: number): Promise<Cody> {
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

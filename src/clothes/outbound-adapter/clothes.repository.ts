import { ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';
import { PrismaService } from '../../prisma/prisma.service';

export class ClothesRepository implements ClothesOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(createClothes, files) {
        return this.prisma.clothes.create({
            ...createClothes,
            clothesImg: files[0].originalname,
        });
    }

    async findOne(id: number) {
        return this.prisma.clothes.findUnique({
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
                clothesImg: files[0].originalname,
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

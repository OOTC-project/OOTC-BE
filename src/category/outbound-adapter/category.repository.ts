import { Injectable } from '@nestjs/common';
import { CategoryOutboundPort } from '../outbound-port/category.outbound-port';
import { CreateCategory, UpdateCategory } from '../types/category.type';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryRepository implements CategoryOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCategory: CreateCategory) {
        return this.prisma.category.create({
            data: {
                name: createCategory.name,
            },
        });
    }

    async findAllCategories() {
        return this.prisma.category.findMany({
            include: {
                clothes: true,
            },
        });
    }

    async findOneCategory(id: number) {
        return this.prisma.category.findUnique({
            where: {
                id,
            },
        });
    }

    async updateCategory(id: number, updateCategory: UpdateCategory) {
        return this.prisma.category.update({
            where: {
                id,
            },
            data: {
                name: updateCategory.name,
            },
        });
    }

    async deleteCategory(id: number) {
        return this.prisma.category.delete({
            where: {
                id,
            },
        });
    }
}

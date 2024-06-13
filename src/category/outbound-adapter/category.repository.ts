import { Injectable } from '@nestjs/common';
import { CategoryOutboundPort } from '../outbound-port/category.outbound-port';
import { UpdateCategory } from '../types/category.type';
import { PrismaService } from '../../prisma/prisma.service';
import { Category, Member } from '@prisma/client';
import { RequestCreateCategory } from '../dto/request_create_category.dto';

@Injectable()
export class CategoryRepository implements CategoryOutboundPort {
    constructor(private readonly prisma: PrismaService) {}

    async create(createCategory: RequestCreateCategory): Promise<Category> {
        return this.prisma.category.create({
            data: {
                name: createCategory.name,
            },
        });
    }

    async findAllCategories(user: Member): Promise<Category[]> {
        return this.prisma.category.findMany({
            include: {
                clothes: {
                    where: {
                        fkMemberId: user.id,
                    },
                },
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

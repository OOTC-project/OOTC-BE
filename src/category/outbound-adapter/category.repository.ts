import { Injectable } from '@nestjs/common';
import { CategoryOutboundPort } from '../outbound-port/category.outbound-port';
import { CreateCategory } from '../types/category.type';
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
}

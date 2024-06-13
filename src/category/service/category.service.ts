import { Inject, Injectable } from '@nestjs/common';
import { CategoryInboundPort } from '../inbound-port/category.inbound-port';
import { CATEGORY_OUTBOUND_PORT, CategoryOutboundPort } from '../outbound-port/category.outbound-port';
import { UpdateCategory } from '../types/category.type';
import { RequestCreateCategory } from '../dto/request_create_category.dto';
import { Category, Member } from '@prisma/client';

@Injectable()
export class CategoryService implements CategoryInboundPort {
    constructor(
        @Inject(CATEGORY_OUTBOUND_PORT)
        private readonly categoryOutboundPort: CategoryOutboundPort,
    ) {}

    async create(createCategory: RequestCreateCategory): Promise<Category> {
        return this.categoryOutboundPort.create(createCategory);
    }

    async findAllCategories(user: Member): Promise<Category[]> {
        return this.categoryOutboundPort.findAllCategories(user);
    }

    async updateCategory(id: number, updateCategory: UpdateCategory): Promise<Category> {
        return this.categoryOutboundPort.updateCategory(id, updateCategory);
    }

    async deleteCategory(id: number): Promise<Category> {
        return this.categoryOutboundPort.deleteCategory(id);
    }
}

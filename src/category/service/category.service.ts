import { Inject, Injectable } from '@nestjs/common';
import { CategoryInboundPort } from '../inbound-port/category.inbound-port';
import { CATEGORY_OUTBOUND_PORT, CategoryOutboundPort } from '../outbound-port/category.outbound-port';
import { CreateCategory, UpdateCategory } from '../types/category.type';

@Injectable()
export class CategoryService implements CategoryInboundPort {
    constructor(
        @Inject(CATEGORY_OUTBOUND_PORT)
        private readonly categoryOutboundPort: CategoryOutboundPort,
    ) {}

    async create(createCategory: CreateCategory) {
        return this.categoryOutboundPort.create(createCategory);
    }

    async findAllCategories(user) {
        return this.categoryOutboundPort.findAllCategories(user);
    }

    async findOneCategory(id: number) {
        return this.categoryOutboundPort.findOneCategory(id);
    }

    async updateCategory(id: number, updateCategory: UpdateCategory) {
        return this.categoryOutboundPort.updateCategory(id, updateCategory);
    }

    async deleteCategory(id: number) {
        return this.categoryOutboundPort.deleteCategory(id);
    }
}

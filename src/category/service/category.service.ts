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

    async findAllCategories() {}

    async updateCategory(id: number, updateCategory: UpdateCategory) {}

    async deleteCategory(id: number) {}
}

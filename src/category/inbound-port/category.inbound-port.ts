import { CreateCategory, UpdateCategory } from '../types/category.type';

export const CATEGORY_INBOUND_PORT = 'CATEGORY_INBOUND_PORT' as const;

export interface CategoryInboundPort {
    create(createCategory: CreateCategory);

    findAllCategories(user);

    findOneCategory(id: number);

    updateCategory(id: number, updateCategory: UpdateCategory);

    deleteCategory(id: number);
}

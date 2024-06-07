import { CreateCategory, UpdateCategory } from '../types/category.type';

export const CATEGORY_OUTBOUND_PORT = 'CATEGORY_OUTBOUND_PORT' as const;

export interface CategoryOutboundPort {
    create(createCategory: CreateCategory);

    findAllCategories(user);

    findOneCategory(id: number);

    updateCategory(id: number, updateCategory: UpdateCategory);

    deleteCategory(id: number);
}

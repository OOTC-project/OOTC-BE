import { CreateCategory } from '../types/category.type';

export const CATEGORY_OUTBOUND_PORT = 'CATEGORY_OUTBOUND_PORT' as const;

export interface CategoryOutboundPort {
    create(createCategory: CreateCategory);

    findAllCategories();

    findOneCategory(id: number);
}

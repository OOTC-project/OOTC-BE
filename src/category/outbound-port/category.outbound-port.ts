import { UpdateCategory } from '../types/category.type';
import { RequestCreateCategory } from '../dto/request_create_category.dto';
import { Category } from '@prisma/client';

export const CATEGORY_OUTBOUND_PORT = 'CATEGORY_OUTBOUND_PORT' as const;

export interface CategoryOutboundPort {
    create(createCategory: RequestCreateCategory): Promise<Category>;

    findAllCategories(user): Promise<Category[]>;

    findOneCategory(id: number);

    updateCategory(id: number, updateCategory: UpdateCategory);

    deleteCategory(id: number);
}

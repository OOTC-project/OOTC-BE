import { UpdateCategory } from '../types/category.type';
import { RequestCreateCategory } from '../dto/request_create_category.dto';
import { Category, Member } from '@prisma/client';

export const CATEGORY_INBOUND_PORT = 'CATEGORY_INBOUND_PORT' as const;

export interface CategoryInboundPort {
    create(createCategory: RequestCreateCategory): Promise<Category>;

    findAllCategories(user: Member): Promise<Category[]>;

    updateCategory(id: number, updateCategory: UpdateCategory): Promise<Category>;

    deleteCategory(id: number): Promise<Category>;
}

import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { RequestCreateCategory } from '../dto/request_create_category.dto';
import { RequestUpdateCategory } from '../dto/request_update_category.dto';
import { CATEGORY_INBOUND_PORT, CategoryInboundPort } from '../inbound-port/category.inbound-port';

@Controller('category')
export class CategoryController {
    constructor(
        @Inject(CATEGORY_INBOUND_PORT)
        private readonly categoryInboundPort: CategoryInboundPort,
    ) {}

    @Post()
    async create(@Body() createCategory: RequestCreateCategory) {
        return this.categoryInboundPort.create(createCategory);
    }

    @Get()
    async findAllCategories() {
        return this.categoryInboundPort.findAllCategories();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.categoryInboundPort.findOneCategory(id);
    }

    @Patch(':id')
    async updateCategory(@Param('id') id: number, @Body() updateCategory: RequestUpdateCategory) {
        return this.categoryInboundPort.updateCategory(id, updateCategory);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: number) {
        return this.categoryInboundPort.deleteCategory(id);
    }
}

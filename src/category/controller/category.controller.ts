import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RequestCreateCategory } from '../dto/request_create_category.dto';
import { RequestUpdateCategory } from '../dto/request_update_category.dto';
import { CATEGORY_INBOUND_PORT, CategoryInboundPort } from '../inbound-port/category.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ApiOperation } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseCreateCategoryDto } from '../dto/response_create_category.dto';
import { ResponseFindAllCategoryDto } from '../dto/response_findAll_category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        @Inject(CATEGORY_INBOUND_PORT)
        private readonly categoryInboundPort: CategoryInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({
        summary: '카테고리를 만든다',
        description: '카테고리를 만든다',
    })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseCreateCategoryDto,
            exampleTitle: '카테고리 만들기 성공',
            exampleDescription: '카테고리 만들기 성공한 모습이다',
        },
    ])
    async create(@Body() createCategory: RequestCreateCategory): Promise<Category> {
        return this.categoryInboundPort.create(createCategory);
    }

    @Get()
    @UseGuards(JwtGuard)
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindAllCategoryDto,
            exampleTitle: '카테고리 조회 성공',
            exampleDescription: '카테고리 만들기 조회 성공',
        },
    ])
    async findAllCategories(@Req() { user }): Promise<Category[]> {
        return await this.categoryInboundPort.findAllCategories(user);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number) {
        return this.categoryInboundPort.findOneCategory(id);
    }

    @Patch(':id')
    @UseGuards(JwtGuard)
    async updateCategory(@Param('id') id: number, @Body() updateCategory: RequestUpdateCategory) {
        return this.categoryInboundPort.updateCategory(id, updateCategory);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteCategory(@Param('id') id: number) {
        return this.categoryInboundPort.deleteCategory(id);
    }
}

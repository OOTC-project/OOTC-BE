import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CLOTHES_INBOUND_PORT, ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@Controller('clothes')
export class ClothesController {
    constructor(
        @Inject(CLOTHES_INBOUND_PORT)
        private readonly clothesInboundPort: ClothesInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() createClothes) {}

    @Get()
    @UseGuards(JwtGuard)
    async findAll() {}

    @Get('/:id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number) {}

    @Patch('/id')
    @UseGuards(JwtGuard)
    async update(@Param('id') id: number, @Body() updateClothes) {}

    @Delete('/id')
    @UseGuards(JwtGuard)
    async remove(@Param('id') id: number) {}
}

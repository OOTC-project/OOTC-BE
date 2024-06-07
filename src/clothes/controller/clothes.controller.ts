import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UploadedFiles, UseGuards } from '@nestjs/common';
import { CLOTHES_INBOUND_PORT, ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { UploadToS3 } from '../../common/decorator';
import { AWSS3Type } from '../../common/type/aws_s3.type';
import { RequestCreateClothesDto } from '../dtos/request_create_clothes.dto';
import { request } from 'express';

@Controller('clothes')
export class ClothesController {
    constructor(
        @Inject(CLOTHES_INBOUND_PORT)
        private readonly clothesInboundPort: ClothesInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    @UploadToS3([{ name: 'clothesImg' }])
    async create(@Req() { user } = request, @Body() createClothes: RequestCreateClothesDto, @UploadedFiles() files: AWSS3Type) {
        return this.clothesInboundPort.create(createClothes, files, user);
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number) {
        return this.clothesInboundPort.findOne(id);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    @UploadToS3([{ name: 'clothesImg' }])
    async update(@Param('id') id: number, @Body() updateClothes, @UploadedFiles() files: AWSS3Type) {
        console.log('=>(clothes.controller.ts:33) files', files);
        return this.clothesInboundPort.update(id, updateClothes, files);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async remove(@Param('id') id: number) {
        return this.clothesInboundPort.remove(id);
    }
}

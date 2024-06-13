import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Req, UploadedFiles, UseGuards } from '@nestjs/common';
import { CLOTHES_INBOUND_PORT, ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { UploadToS3 } from '../../common/decorator';
import { AWSS3Type } from '../../common/interface/base_column.interface';
import { RequestCreateClothesDto } from '../dtos/request_create_clothes.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseCreateClothesDto } from '../dtos/response_create_clothes.dto';
import { plainToClass } from 'class-transformer';
import { ResponseClothesFindOneDto } from '../dtos/response_clothes_find_one.dto';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import { Clothes } from '@prisma/client';
import { RequestUpdateClothesDto } from '../dtos/request_update_clothes.dto';

@Controller('clothes')
export class ClothesController {
    constructor(
        @Inject(CLOTHES_INBOUND_PORT)
        private readonly clothesInboundPort: ClothesInboundPort,
        @Inject(CONFIG_OUTBOUND_PORT)
        private readonly configOutboundPort: ConfigOutboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({
        summary: '옷을 추가한다',
        description: '옷을 추가한다.',
    })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseCreateClothesDto,
            exampleTitle: '옷 추가 성공!',
            exampleDescription: '옷을 추가해버려 버렸지 뭐야',
        },
    ])
    @UploadToS3([{ name: 'clothesImg' }])
    async create(@Req() { user }, @Body() createClothes: RequestCreateClothesDto, @UploadedFiles() files: AWSS3Type): Promise<ResponseCreateClothesDto> {
        const clothesCreateData = await this.clothesInboundPort.create(createClothes, files, user);

        return plainToClass(ResponseCreateClothesDto, clothesCreateData);
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number): Promise<ResponseClothesFindOneDto> {
        const findOneClothesById: Clothes = await this.clothesInboundPort.findOne(id);

        const imagePrefix: string = this.configOutboundPort.getConfigByKey('AWS_IMAGE_PREFIX');
        return new ResponseClothesFindOneDto(findOneClothesById, imagePrefix);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    @UploadToS3([{ name: 'clothesImg' }])
    async update(@Param('id') id: number, @Body() updateClothes: RequestUpdateClothesDto, @UploadedFiles() files: AWSS3Type): Promise<ResponseClothesFindOneDto> {
        const findOneClothesById = await this.clothesInboundPort.update(id, updateClothes, files);

        const imagePrefix = this.configOutboundPort.getConfigByKey('AWS_IMAGE_PREFIX');
        return new ResponseClothesFindOneDto(findOneClothesById, imagePrefix);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async remove(@Param('id') id: number) {
        return this.clothesInboundPort.remove(id);
    }
}

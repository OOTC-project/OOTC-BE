import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { CLOTHES_OUTBOUND_PORT, ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';
import { ResponseClothesFindOneDto } from '../dtos/response_clothes_find_one.dto';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import _ from 'lodash';

@Injectable()
export class ClothesService implements ClothesInboundPort {
    constructor(
        @Inject(CLOTHES_OUTBOUND_PORT)
        private readonly clothesOutboundPort: ClothesOutboundPort,
        @Inject(CONFIG_OUTBOUND_PORT)
        private readonly configOutboundPort: ConfigOutboundPort,
    ) {}

    async create(createClothes, files, user) {
        return this.clothesOutboundPort.create(createClothes, files, user);
    }

    async findOne(id: number) {
        const findOneClothesById = await this.clothesOutboundPort.findOne(id);

        if (!!_.isNil(findOneClothesById)) {
            throw new BadRequestException('null', '해당 id의 clothes가 없습니다.');
        }
        console.log('=>(clothes.service.ts:22) findOneClothesById', findOneClothesById);
        const imagePrefix = this.configOutboundPort.getConfigByKey('AWS_IMAGE_PREFIX');
        console.log('=>(clothes.service.ts:24) imagePrefix', imagePrefix);
        return new ResponseClothesFindOneDto(findOneClothesById, imagePrefix);
    }

    async update(id: number, updateClothes, files) {
        const { name, description, position, fkCategoryId } = updateClothes;
        const updateClothesObject = { name, description, position, fkCategoryId };
        const updateClothesById = await this.clothesOutboundPort.update(id, updateClothesObject, files);
        const imagePrefix = this.configOutboundPort.getConfigByKey('AWS_IMAGE_PREFIX');

        return new ResponseClothesFindOneDto(updateClothesById, imagePrefix);
    }

    async remove(id: number) {
        return this.clothesOutboundPort.remove(id);
    }
}

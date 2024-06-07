import { Inject, Injectable } from '@nestjs/common';
import { ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { CLOTHES_OUTBOUND_PORT, ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';
import { ResponseClothesFindOneDto } from '../dtos/response_clothes_find_one.dto';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';

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
        const imagePrefix = this.configOutboundPort.getConfigByKey('AWS_IMAGE_PREFIX');
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

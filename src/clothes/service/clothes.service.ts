import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { CLOTHES_OUTBOUND_PORT, ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import _ from 'lodash';
import { Clothes } from '@prisma/client';
import { RequestUpdateClothes } from '../interface/clothes.interface';
import { AWSS3Type } from '../../common/interface/base_column.interface';

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

    async findOne(id: number): Promise<Clothes> {
        const findOneClothesById = await this.clothesOutboundPort.findOne(id);

        if (!!_.isNil(findOneClothesById)) {
            throw new BadRequestException('null', '해당 id의 clothes가 없습니다.');
        }

        return findOneClothesById;
    }

    async update(id: number, updateClothes: RequestUpdateClothes, files: AWSS3Type): Promise<Clothes> {
        const { name, description, position, fkCategoryId } = updateClothes;
        const updateClothesObject = { name, description, position, fkCategoryId };
        return await this.clothesOutboundPort.update(id, updateClothesObject, files);
    }

    async remove(id: number): Promise<Clothes> {
        return this.clothesOutboundPort.remove(id);
    }
}

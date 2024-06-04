import { Inject, Injectable } from '@nestjs/common';
import { ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { CLOTHES_OUTBOUND_PORT, ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';

@Injectable()
export class ClothesService implements ClothesInboundPort {
    constructor(
        @Inject(CLOTHES_OUTBOUND_PORT)
        private readonly clothesOutboundPort: ClothesOutboundPort,
    ) {}

    async create(createClothes, files) {
        return this.clothesOutboundPort.create(createClothes, files);
    }

    async findOne(id: number) {
        return this.clothesOutboundPort.findOne(id);
    }

    async update(id: number, updateClothes, files) {
        return this.clothesOutboundPort.update(id, updateClothes, files);
    }

    async remove(id: number) {
        return this.clothesOutboundPort.remove(id);
    }
}

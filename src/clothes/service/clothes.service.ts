import { Inject, Injectable } from '@nestjs/common';
import { ClothesInboundPort } from '../inbound-port/clothes.inbound-port';
import { CLOTHES_OUTBOUND_PORT, ClothesOutboundPort } from '../outbound-port/clothes.outbound-port';

@Injectable()
export class ClothesService implements ClothesInboundPort {
    constructor(
        @Inject(CLOTHES_OUTBOUND_PORT)
        private readonly clothesOutboundPort: ClothesOutboundPort,
    ) {}

    async create(createClothes) {}

    async findAll() {}

    async findOne(id: number) {}

    async update(id: number, updateClothes) {}

    async remove(id: number) {}
}

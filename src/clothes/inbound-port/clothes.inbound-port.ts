export const CLOTHES_INBOUND_PORT = 'CLOTHES_INBOUND_PORT' as const;

export interface ClothesInboundPort {
    create(createClothes);

    findAll();

    findOne(id: number);

    update(id: number, updateClothes);

    remove(id: number);
}

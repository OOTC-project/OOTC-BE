export const CLOTHES_INBOUND_PORT = 'CLOTHES_INBOUND_PORT' as const;

export interface ClothesInboundPort {
    create(createClothes, files, user);

    findOne(id: number);

    update(id: number, updateClothes, files);

    remove(id: number);
}

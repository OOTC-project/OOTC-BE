export const CLOTHES_OUTBOUND_PORT = 'CLOTHES_OUTBOUND_PORT' as const;

export interface ClothesOutboundPort {
    create(createClothes, files, user);

    findOne(id: number);

    update(id: number, updateClothes, files);

    remove(id: number);
}

import { RequestCreateClothes, RequestUpdateClothes } from '../interface/clothes.interface';

import { AWSS3Type } from '../../common/interface/base_column.interface';

import { Clothes, Member } from '@prisma/client';

export const CLOTHES_OUTBOUND_PORT = 'CLOTHES_OUTBOUND_PORT' as const;

export interface ClothesOutboundPort {
    create(createClothes: RequestCreateClothes, files: AWSS3Type, user: Member): Promise<Clothes>;

    findOne(id: number): Promise<Clothes>;

    update(id: number, updateClothes: RequestUpdateClothes, files: AWSS3Type): Promise<Clothes>;

    remove(id: number): Promise<Clothes>;
}

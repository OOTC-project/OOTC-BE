import { Clothes, Member } from '@prisma/client';
import { AWSS3Type } from '../../common/interface/base_column.interface';

import { RequestCreateClothes, RequestUpdateClothes } from '../interface/clothes.interface';

export const CLOTHES_INBOUND_PORT = 'CLOTHES_INBOUND_PORT' as const;

export interface ClothesInboundPort {
    create(createClothes: RequestCreateClothes, files: AWSS3Type, user: Member): Promise<Clothes>;

    findOne(id: number): Promise<Clothes>;

    update(id: number, updateClothes: RequestUpdateClothes, files: AWSS3Type): Promise<Clothes>;

    remove(id: number): Promise<Clothes>;
}

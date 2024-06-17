import { Clothes, Cody, CodyClothes } from '@prisma/client';

export type RequestCreateCody = {
    name: string;
    clothes: number[];
};
export type CodyWithDetails = Cody & {
    clothes: Clothes[];
    codyClothes: CodyClothes[];
};

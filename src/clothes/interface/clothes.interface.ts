export interface RequestCreateClothes {
    name: string;
    clothesImg: string;
    description: string;
    position: string;
    fkCategoryId: number;
}

export interface RequestUpdateClothes extends Partial<RequestCreateClothes> {}

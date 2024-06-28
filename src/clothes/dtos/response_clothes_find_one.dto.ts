import { ApiProperty } from '@nestjs/swagger';

export class ResponseClothesFindOneDto {
    @ApiProperty({
        description: 'clothes ID (PK)',
        example: 1,
        type: Number,
    })
    readonly id: number;

    @ApiProperty({
        description: '옷 이름',
        example: '별이 티셔츠',
        type: String,
    })
    readonly name: string;

    @ApiProperty({
        description: '옷 이미지 URL',
        example: 'https://ootc.s3.ap-northeast-2.amazonaws.com/IMG_6044.jpg',
        type: String,
    })
    readonly clothesImg: string;

    @ApiProperty({
        description: '옷에 대한 설명',
        example: '별이 너무 귀엽쟈나',
        type: String,
    })
    readonly description: string;

    @ApiProperty({
        description: '사용자가 저장한 옷의 위치',
        example: '내방 침대 위',
        type: String,
    })
    readonly position: string;

    @ApiProperty({
        description: '옷의 카테고리 아이디 ( FK )',
        example: 1,
        type: Number,
    })
    readonly fkCategoryId: number;

    @ApiProperty({
        description: '옷의 주인인 고객 ID (FK)',
        example: 1,
        type: Number,
    })
    readonly fkMemberId: number;

    @ApiProperty({
        description: '옷의 저장일',
        example: '2024-06-07T06:07:07.378Z',
        type: String,
    })
    readonly createdAt: string | Date;

    constructor(clothes) {
        this.clothesImg = `${clothes.clothesImg}`;
        this.createdAt = clothes.createdAt;
        this.name = clothes.name;
        this.fkMemberId = clothes.fkMemberId;
        this.fkCategoryId = clothes.fkCategoryId;
        this.description = clothes.description;
        this.position = clothes.position;
    }
}

import { ApiProperty } from '@nestjs/swagger';

class CodyDto {
    @ApiProperty({ description: '코디 ID', example: 3 })
    id: number;

    @ApiProperty({ description: '코디 이름', example: '코디이름은' })
    name: string;

    @ApiProperty({ description: '코디 생성 날짜', example: '2024-06-07T07:47:04.123Z' })
    createdAt: string;

    @ApiProperty({ description: '멤버 ID', example: 1 })
    fkMemberId: number;
}

class ClothesDto {
    @ApiProperty({ description: '옷 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '옷 이름', example: '별이코트' })
    name: string;

    @ApiProperty({ description: '옷 이미지', example: 'wecode 추억.png' })
    clothesImg: string;

    @ApiProperty({ description: '옷 설명', example: '옷 설명 업데이트' })
    description: string;

    @ApiProperty({ description: '옷 위치', example: '우리집 침대' })
    position: string;

    @ApiProperty({ description: '카테고리 ID', example: 1 })
    fkCategoryId: number;

    @ApiProperty({ description: '멤버 ID', example: 1 })
    fkMemberId: number;

    @ApiProperty({ description: '생성 날짜', example: '2024-06-07T06:07:07.378Z' })
    createdAt: string;
}

class ResponseFindAllCodyDto {
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @ApiProperty({ description: '코디 ID', example: 3 })
    fkCodyId: number;

    @ApiProperty({ description: '옷 ID', example: 1 })
    fkClothesId: number;

    @ApiProperty({ description: '생성 날짜', example: '2024-06-07T07:47:04.129Z' })
    createdAt: string;

    @ApiProperty({ type: CodyDto })
    cody: CodyDto;

    @ApiProperty({ type: ClothesDto })
    clothes: ClothesDto;
}

export class ResponseFindAllCodyListDto {
    @ApiProperty({ type: [ResponseFindAllCodyDto] })
    data: ResponseFindAllCodyDto[];
}

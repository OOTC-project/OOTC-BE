import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestCreateClothesDto {
    @ApiProperty({
        description: '옷 이미지',
        format: 'binary',
    })
    readonly clothesImg: string;

    @ApiProperty({
        description: '옷의 이름',
        example: '별이 티셔츠',
        type: String,
    })
    readonly name: string;

    @ApiProperty({
        description: '옷의 설명',
        example: '이 옷은 귀여운 별이가 그려진 셔츠이다',
        type: String,
    })
    readonly description: string;

    @ApiProperty({
        description: '옷의 위치',
        example: '집앞 서랍장 -> 옷의 위치 관련 어떻게 처리할지 필요해보인다.',
    })
    readonly position: string;

    @ApiProperty({
        description: '카테고리 외래키 id',
        example: 1,
        type: Number,
    })
    @IsNotEmpty()
    readonly fkCategoryId: number;
}

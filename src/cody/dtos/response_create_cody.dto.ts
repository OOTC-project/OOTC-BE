import { BaseFieldDto } from '../../common/dtos/baseField.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Clothes, Cody } from '@prisma/client';

export class ResponseCreateCodyDto extends BaseFieldDto {
    @ApiProperty({
        description: '코디 id',
        example: 1,
    })
    readonly fkCodyId: number;

    @ApiProperty({
        description: '멤버 id',
        example: 1,
    })
    readonly fkMemberId: number;

    @ApiProperty({
        description: '옷의 정보',
        example: {
            id: 1,
            name: '별이코트',
            clothesImg: 'wecode 추억.png',
            description: '옷 설명 업데이트',
            position: '우리집 침대',
            fkCategoryId: 1,
            fkMemberId: 1,
            createdAt: '2024-06-07T06:07:07.378Z',
        },
    })
    readonly clothes: Clothes;

    @ApiProperty({
        description: '코디의 설명',
        example: {
            id: 9,
            name: '코디이름은',
            createdAt: '2024-06-17T01:36:18.091Z',
            fkMemberId: 1,
        },
    })
    readonly cody: Cody;
}

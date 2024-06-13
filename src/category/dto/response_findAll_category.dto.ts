import { BaseFieldDto } from '../../common/dtos/baseField.dto';
import { IsArray, IsString } from 'class-validator';
import { ResponseFindAllDto } from '../../clothes/dtos/response_findAll.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindAllCategoryDto extends BaseFieldDto {
    @ApiProperty({
        description: '카테고리 이름',
        name: '카테고리 이름',
        example: '상의',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '카테고리의 연결된 옷들',
        name: '카테고리의 연결된 옷들',
        example: [
            {
                id: 1,
                name: '별이코트',
                clothesImg: `${process.env.AWS_IMAGE_PREFIX}wecode_추억.png`,
                description: '옷 설명 업데이트',
                position: '우리집 침대',
                fkCategoryId: 1,
                fkMemberId: 1,
                createdAt: '2024-06-07T06:07:07.378Z',
            },
        ],
        type: [ResponseFindAllDto],
    })
    @IsArray()
    clothes: ResponseFindAllDto[];
}

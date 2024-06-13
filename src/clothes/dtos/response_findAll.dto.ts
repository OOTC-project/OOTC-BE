import { BaseFieldDto } from '../../common/dtos/baseField.dto';
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as process from 'node:process';
import { Transform } from 'class-transformer';

export class ResponseFindAllDto extends BaseFieldDto {
    @ApiProperty({
        description: '옷의 이름',
        name: '옷의 이름',
        example: '별이옷',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '옷 이미지 URL',
        name: '옷 이미지 URL',
        example: `${process.env.AWS_IMAGE_PREFIX}$cutestar.jpg`,
        type: String,
    })
    @IsString()
    @Transform(({ value }) => (value ? `${process.env.AWS_IMAGE_PREFIX}${value}` : null))
    clothesImg: string;

    @ApiProperty({
        description: '옷의 설명',
        name: '옷의 설명',
        example: `별의 옷 설명은 여기라구요`,
        type: String,
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: '옷의 위치',
        name: '옷의 위치',
        example: `별이는 내방 침대를 좋아하지`,
        type: String,
    })
    @IsString()
    position: string;

    @ApiProperty({
        description: '연결된 외래키 ( 카테고리 ID )',
        name: '연결된 외래키 ( 카테고리 ID )',
        example: 1,
        type: Number,
    })
    @IsInt()
    fkCategoryId: number;

    @ApiProperty({
        description: '연결된 외래키 ( 회원 ID )',
        name: '연결된 외래키 ( 회원 ID )',
        example: 1,
        type: Number,
    })
    @IsInt()
    fkMemberId: number;
}

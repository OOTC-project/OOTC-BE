import { BaseFieldDto } from '../../common/dtos/baseField.dto';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateClothesDto extends BaseFieldDto {
    @ApiProperty({ description: '옷 이름' })
    @Expose()
    name: string;

    @ApiProperty({ description: '옷 이미지 URL' })
    @Expose()
    @Transform(({ value }) => (value ? `${process.env.AWS_IMAGE_PREFIX}${value}` : null))
    clothesImg: string;

    @ApiProperty({ description: '옷 설명' })
    @Expose()
    description: string;

    @ApiProperty({ description: '옷 위치' })
    @Expose()
    position: string;

    @ApiProperty({ description: '카테고리 ID' })
    @Expose()
    fkCategoryId: number;

    @ApiProperty({ description: '회원 ID' })
    @Expose()
    fkMemberId: number;
}

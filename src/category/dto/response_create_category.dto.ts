import { ApiProperty } from '@nestjs/swagger';
import { BaseFieldDto } from '../../common/dtos/baseField.dto';

export class ResponseCreateCategoryDto extends BaseFieldDto {
    @ApiProperty({
        description: '카테고리 이름',
        type: String,
        example: '카테카테카레라이스',
    })
    readonly name: string;
}

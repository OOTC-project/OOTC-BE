import { ApiProperty } from '@nestjs/swagger';
import { BaseFieldDto } from '../../common/dtos/baseField.dto';

export class ResponseRecommendDto extends BaseFieldDto {
    @ApiProperty({
        description: '추천한 사람의 ID',
        example: 1,
        type: Number,
    })
    readonly fkMemberId: number;
    @ApiProperty({
        description: '추천한 코디의 ID',
        example: 1,
        type: Number,
    })
    readonly fkCodyId: number;
}

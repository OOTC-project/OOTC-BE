import { ApiProperty } from '@nestjs/swagger';

export class RequestUpdateCategory {
    @ApiProperty({
        example: '카테캍체',
        description: '수정할 카테고리의 이름',
    })
    readonly name: string;
}

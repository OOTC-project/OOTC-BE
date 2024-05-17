import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestCreateCategory {
    @ApiProperty({
        description: '카테고리 이름',
        example: '카테카테',
    })
    @IsNotEmpty()
    readonly name: string;
}

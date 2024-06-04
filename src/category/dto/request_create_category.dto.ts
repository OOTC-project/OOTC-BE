import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestCreateCategory {
    @ApiProperty({
        description: '카테고리 이름',
        example: 'Outer',
    })
    @IsNotEmpty()
    readonly name: string;
}

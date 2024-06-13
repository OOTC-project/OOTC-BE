import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class BaseFieldDto {
    @ApiProperty({
        description: '테이블의 PK (id)',
        example: 1,
        type: Number,
    })
    @IsInt()
    readonly id: number;

    @ApiProperty({
        description: '생성일',
        example: '2024-06-12T03:33:08.031Z',
        type: String || Date,
    })
    readonly createdAt: string | Date;
}

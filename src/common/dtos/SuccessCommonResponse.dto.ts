import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { EnumToArray } from '../utils/enumNumberToArray';

export class SuccessCommonResponseDto<T> {
    @ApiProperty({ enum: EnumToArray(HttpStatus), description: '상태코드' })
    @Expose()
    statusCode: number;

    @ApiProperty({ type: String, description: '성공여부 - OK | ERROR' })
    @Expose()
    message: string;

    @ApiProperty({
        type: 'generic',
        description: 'object 또는 array 형식의 응답데이타가 옵니다.',
    })
    @Expose()
    data: T;
}

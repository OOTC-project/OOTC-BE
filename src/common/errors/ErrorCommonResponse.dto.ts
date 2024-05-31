import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { EnumToArray } from '../utils/enumNumberToArray';

export class ErrorCommonResponse<T> {
    @ApiProperty({ enum: EnumToArray(HttpStatus), description: '상태코드' })
    @Expose()
    readonly statusCode: number;

    @ApiProperty({ type: String, description: '에러 발생시간' })
    @Expose()
    readonly timestamp: Date;

    @ApiProperty({ type: String, description: '에러 발생 url' })
    @Expose()
    readonly path: string;

    @ApiProperty({
        description: '에러 메시지',
        type: String,
    })
    readonly message: string;

    @ApiProperty({
        type: 'generic',
        description: 'HttpExceptionErrorResponseDto,ValidationErrorResponseDto 두가지가 올수있습니다.',
    })
    @Expose()
    error: T;
}

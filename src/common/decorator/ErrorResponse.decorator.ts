import { applyDecorators, HttpException, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SimpleHttpExceptionErrorResponseDto } from '../dtos/SimpleHttpExceptionErrorResponse.dto'; // 수정된 DTO import

export interface SimpleErrorResponseOption {
    model: Type<HttpException>;
    exampleTitle: string;
    message: string;
    exampleDescription: string;
    code?: string;
}

export const SimpleErrorResponse = (StatusCode: HttpStatus, errorResponseOptions: SimpleErrorResponseOption[]) => {
    const examples = errorResponseOptions
        .map((error: SimpleErrorResponseOption) => {
            if (typeof error.message !== 'string') {
                throw Error('http오류는 넘겨줄때 string 타입으로 주셔야합니다.');
            }
            const simpleErrorDto = new SimpleHttpExceptionErrorResponseDto(StatusCode, error.model.name, error.message);
            return {
                [error.exampleTitle]: {
                    value: simpleErrorDto,
                    description: error.exampleDescription,
                },
            };
        })
        .reduce((result, item) => {
            Object.assign(result, item);
            return result;
        }, {});

    return applyDecorators(
        ApiExtraModels(SimpleHttpExceptionErrorResponseDto),
        ApiResponse({
            status: StatusCode,
            content: {
                'application/json': {
                    schema: {
                        additionalProperties: { $ref: getSchemaPath(SimpleHttpExceptionErrorResponseDto) },
                    },
                    examples: examples,
                },
            },
        }),
    );
};

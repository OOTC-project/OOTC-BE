import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessCommonResponseDto } from '../dtos/SuccessCommonResponse.dto';
import { makeInstanceByApiProperty } from '../utils/makeInstanceByApiProperty';
import { mergeObjects } from '../utils/mergeTwoObj';

interface SuccessResponseOption {
    /**
     * 응답 디티오를 인자로받습니다
     * 예시 : ResponseRequestValidationDto
     */
    model: Type<any>;
    /**
     * 예시의 제목을 적습니다
     */
    exampleTitle: string;
    /**
     *  깊은 복사로 변경하고 싶은 응답값을 적습니다. 오버라이트 됩니다.
     *  nested 된 obj 인 경우엔 해당 obj 가 바뀌는것이아닌 안에 있는 property만 바뀝니다.
     *  즉 주어진 객체로 리프 프로퍼티에 대해 오버라이트됩니다.
     */
    overwriteValue?: Record<string, any>;
    /**
     * 어떠한 상황일 때 예시형태의 응답값을 주는지 기술 합니다.
     */
    exampleDescription: string;
    /**
     * 제네릭 형태가 필요할 때 기술합니다.
     * pageDto<generic> 인경우?
     */
    generic?: Type<any>;
}

/**
 * 2022 07 29 이찬진  @ImNM
 * 여러 응답값을 손쉽게 적기위한 데토레이터 입니다
 * 기본적으로 status 코드가 같으면 하나밖에 못적기때문에 example을 추가하기위해서 커스텀 하였습니다.
 * @param StatusCode 응답 코드입니다. HttpStatus enum 값을 사용하시면됩니다.
 * @param successResponseOptions
 * @returns
 */
export const SuccessResponse = (StatusCode: HttpStatus, successResponseOptions: SuccessResponseOption[]) => {
    const examples = successResponseOptions.reduce((acc, response) => {
        const commonResponseInstance = new SuccessCommonResponseDto();
        commonResponseInstance.statusCode = StatusCode;
        commonResponseInstance.message = '성공여부 - OK';
        const DtoModel = response.model;
        const dtoData = makeInstanceByApiProperty<typeof DtoModel>(DtoModel, response.generic);

        commonResponseInstance.data = response.overwriteValue ? mergeObjects({}, dtoData, response.overwriteValue) : dtoData;

        acc[response.exampleTitle] = {
            value: commonResponseInstance,
            description: response.exampleDescription,
        };

        return acc;
    }, {});

    const extraModels = new Set(successResponseOptions.map((e) => e.model)) as Set<Type<any>>;
    const extraGenerics = new Set(successResponseOptions.map((e) => e.generic).filter(Boolean)) as Set<Type<any>>;

    return applyDecorators(
        ApiExtraModels(...extraModels, ...extraGenerics, SuccessCommonResponseDto),
        ApiResponse({
            status: StatusCode,
            content: {
                'application/json': {
                    schema: {
                        additionalProperties: { $ref: getSchemaPath(SuccessCommonResponseDto) },
                        oneOf: [...extraModels, ...extraGenerics].map((e) => ({ $ref: getSchemaPath(e) })),
                    },
                    examples,
                },
            },
        }),
    );
};

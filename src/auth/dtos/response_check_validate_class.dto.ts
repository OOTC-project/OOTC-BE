import { ApiProperty } from '@nestjs/swagger';

export class ResponseBooleanDto {
    @ApiProperty({
        description: '검증결과',
        type: Boolean,
        example: true,
    })
    readonly result: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class RequestRecommendLookDto {
    @ApiProperty({
        description: '현재 도시',
        example: 'seoul',
        type: String,
    })
    readonly city: string;

    @ApiProperty({
        description: '현재 국가 코드',
        example: 'KR',
        type: String,
    })
    readonly country: string;
}

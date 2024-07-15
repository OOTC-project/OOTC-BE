import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestRecommendLookDto {
    @ApiProperty({
        description: '현재 도시',
        example: 'seoul',
        type: String,
    })
    @IsString()
    readonly city: string;

    @ApiProperty({
        description: '현재 국가 코드',
        example: 'KR',
        type: String,
    })
    @IsString()
    readonly country: string;
}

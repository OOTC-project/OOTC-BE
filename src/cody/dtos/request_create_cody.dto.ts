import { ApiProperty } from '@nestjs/swagger';

export class RequestCreateCodyDto {
    @ApiProperty({
        description: '코디명',
        example: '올해 여름을 책임질 강력한 코디가 온다',
        type: String,
    })
    readonly name: string;

    @ApiProperty({
        description: '코디의 사용되는 옷',
        example: [1, 2, 3],
        type: Array,
    })
    readonly clothes: number[];
}

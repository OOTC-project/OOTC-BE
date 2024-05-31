import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindIdClassDto {
    @ApiProperty({
        description: '찾은 유저 아이디',
        type: String,
        example: 'cutestar',
    })
    readonly userId: string;
}

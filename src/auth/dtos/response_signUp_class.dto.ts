import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignUpClassDto {
    @ApiProperty({
        description: '회원ID',
        type: String,
        example: 'cutestar',
    })
    userId: string;

    @ApiProperty({
        description: '사용자이름',
        type: String,
        example: '이현태',
    })
    readonly name: string;

    @ApiProperty({
        description: '테이블 id',
        type: Number,
        example: 1,
    })
    readonly id: number;

    @ApiProperty({
        description: '탈퇴여부',
        type: Boolean,
        example: 'false',
    })
    readonly isWithdrawal: boolean;

    @ApiProperty({
        description: '가입일',
        type: String,
        example: '2024-05-30T04:19:32.904Z',
    })
    readonly createdAt: string;
}

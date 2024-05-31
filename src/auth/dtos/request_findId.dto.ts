import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestFindDto {
    @ApiProperty({
        description: '회원이름',
        example: '이현태',
    })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: '이메일',
        example: 'wjdgusxo99@gmail.com',
    })
    readonly email: string;

    @ApiProperty({
        description: '회원id',
        example: 'cutestar',
    })
    readonly userId?: string;
}

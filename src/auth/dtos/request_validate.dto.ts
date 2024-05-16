import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestValidateDto {
    @IsNotEmpty()
    @ApiProperty({
        description: '회원ID',
        example: 'cutestar',
    })
    readonly userId: string;

    @IsNotEmpty()
    @ApiProperty({
        description: '회원 비밀번호',
        example: 'password12!@',
    })
    readonly password: string;
}

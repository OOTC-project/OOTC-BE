import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestSignInDto {
    @ApiProperty({
        description: '회원ID',
        example: 'cutestar',
    })
    @IsNotEmpty()
    readonly userId: string;

    @ApiProperty({
        description: '비밀번호',
        example: '12345678',
    })
    @IsNotEmpty()
    readonly password: string;
}

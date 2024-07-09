import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

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
    @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다' })
    @MaxLength(20, { message: '비밀번호는 최대 20자 이하여야 합니다' })
    @Matches(/(?=.*[A-Z])/, { message: '비밀번호에는 하나 이상의 대문자가 포함되어야 합니다' })
    @Matches(/(?=.*[!@#$%^&*])/, { message: '비밀번호에는 하나 이상의 특수문자가 포함되어야 합니다' })
    readonly password: string;
}

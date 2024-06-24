import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class RequestSignupDto {
    @ApiProperty({
        description: '회원ID',
        example: 'cutestar',
        required: true,
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

    @ApiProperty({
        description: '비밀번호 확인',
        example: '12345678',
    })
    @IsNotEmpty({ message: '비밀번호 확인은 공백이 불가합니다' })
    readonly passwordConfirm: string;

    @ApiProperty({
        description: '사용자이름',
        example: '이현태',
    })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: '이메일',
        example: 'wjdgusxo99@gmail.com',
    })
    @IsNotEmpty({ message: '이메일은 공백이 불가합니다' })
    @IsEmail({}, { message: '유효한 이메일 주소여야 합니다' })
    // @Matches(/^[a-zA-Z0-9._%+-]+@(yourdomain\.com|anotherdomain\.com)$/, { message: '허용되지 않는 이메일 도메인입니다.' })
    readonly email: string;
}

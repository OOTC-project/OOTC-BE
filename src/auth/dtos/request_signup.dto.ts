import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestSignupDto {
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

    @ApiProperty({
        description: '비밀번호 확인',
        example: '12345678',
    })
    @IsNotEmpty()
    readonly passwordConfirm: string;

    @ApiProperty({
        description: '사용자이름',
        example: '내이름은 코난',
    })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({
        description: '프로필 이미지',
        format: 'binary',
    })
    readonly profileImg: string;

    @ApiProperty({
        description: '프로필 이미지',
        format: 'binary',
    })
    readonly backgroundImg: string;

    @ApiProperty({
        description: '이메일',
        example: 'wjdgusxo99@gmail.com',
    })
    readonly email: string;
}

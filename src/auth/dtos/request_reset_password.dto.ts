import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPasswordsMatch } from '../decorator/passwords-match.decorator';

export class RequestResetPasswordDto {
    @ApiProperty({
        example: 1,
        description: 'db의 id *( PK )',
    })
    @IsNotEmpty()
    readonly id: number;

    @ApiProperty({
        example: '123456',
        description: '변경할 비밀번호',
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        example: '123456',
        description: '변경할 비밀번호 확인',
    })
    @IsPasswordsMatch('password', {
        message: 'Password and passwordConfirm do not match',
    })
    readonly passwordConfirm: string;
}

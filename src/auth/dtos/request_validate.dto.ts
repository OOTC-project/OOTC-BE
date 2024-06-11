import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestValidateDto {
    @IsNotEmpty()
    @ApiProperty({
        description: '회원ID',
        example: 'cutestar',
    })
    readonly userId: string;

    @ApiProperty({
        description: '회원 비밀번호',
        example: '1234567',
    })
    readonly password?: string;
}

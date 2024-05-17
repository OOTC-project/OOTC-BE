import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestValidateDto {
    @IsNotEmpty()
    @ApiProperty({
        description: '회원ID',
        example: 'cutestar',
    })
    readonly userId: string;
}

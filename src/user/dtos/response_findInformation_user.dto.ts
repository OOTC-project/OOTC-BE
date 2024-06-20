import { ApiProperty } from '@nestjs/swagger';
import { BaseFieldDto } from '../../common/dtos/baseField.dto';
import { Transform } from 'class-transformer';
import * as process from 'node:process';

export class ResponseFindInformationUserDto extends BaseFieldDto {
    @ApiProperty({
        description: '이름',
        type: String,
        example: '이현태',
    })
    readonly name: string;

    @ApiProperty({
        description: '유저 ID',
        type: String,
        example: 'cutestar12',
    })
    readonly userId: string;

    @ApiProperty({
        description: '프로필 이미지',
        type: String,
        format: 'binary',
        required: false,
    })
    @Transform(({ value }) => {
        if (!value) return null;
        const prefix = process.env.AWS_IMAGE_PREFIX;
        return value.startsWith(prefix) ? value : `${prefix}${value}`;
    })
    profileImg: string;

    @ApiProperty({
        description: '배경 이미지',
        type: String,
        format: 'binary',
        required: false,
    })
    @Transform(({ value }) => {
        if (!value) return null;
        const prefix = process.env.AWS_IMAGE_PREFIX;
        return value.startsWith(prefix) ? value : `${prefix}${value}`;
    })
    backgroundImg: string;

    @ApiProperty({
        description: '탈퇴여부',
        type: Boolean,
        example: 0,
    })
    readonly isWithdrawal: boolean;

    @ApiProperty({
        description: '이메일',
        type: String,
        example: 'test@test.com',
    })
    readonly email: string;
}

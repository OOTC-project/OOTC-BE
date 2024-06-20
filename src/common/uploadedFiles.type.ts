import { ApiProperty } from '@nestjs/swagger';

export class UploadedFileDto {
    @ApiProperty({
        description: '필드 이름',
        type: String,
        example: 'profileImg',
    })
    readonly fieldname: string;

    @ApiProperty({
        description: '원본 파일 이름',
        type: String,
        example: 'IMG_5950.jpg',
    })
    readonly originalname: string;

    @ApiProperty({
        description: '인코딩 방식',
        type: String,
        example: '7bit',
    })
    readonly encoding: string;

    @ApiProperty({
        description: 'MIME 타입',
        type: String,
        example: 'image/jpeg',
    })
    readonly mimetype: string;

    @ApiProperty({
        description: '파일 크기',
        type: Number,
        example: 2392881,
    })
    readonly size: number;

    @ApiProperty({
        description: '파일 버퍼',
        type: String, // buffer 타입을 string으로 설정
        example: '<Buffer ...>',
    })
    readonly buffer: Buffer;

    @ApiProperty({
        description: '파일 URL',
        type: String,
        example: 'https://ootc.s3.ap-northeast-2.amazonaws.com/IMG_5950.jpg',
    })
    readonly url: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { UploadedFileDto } from '../../common/uploadedFiles.type';

export class RequestUpdateUserDto {
    @ApiProperty({
        description: '이름',
        type: String,
        example: '이현태',
    })
    readonly name: string;

    @ApiProperty({
        description: '업로드 파일들 - form data로 profileImg, backgroundImg를 body에 담아 보내면 됩니다.',
        type: () => ({
            profileImg: { type: UploadedFileDto },
            backgroundImg: { type: UploadedFileDto },
        }),
        example: {
            profileImg: {
                fieldname: 'profileImg',
                originalname: 'IMG_5950.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 2392881,
                buffer: '<Buffer ...>',
                url: 'https://ootc.s3.ap-northeast-2.amazonaws.com/IMG_5950.jpg',
            },
            backgroundImg: {
                fieldname: 'backgroundImg',
                originalname: 'IMG_3785.jpeg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1815092,
                buffer: '<Buffer ...>',
                url: 'https://ootc.s3.ap-northeast-2.amazonaws.com/IMG_3785.jpeg',
            },
        },
    })
    readonly uploadedFiles: {
        profileImg: UploadedFileDto;
        backgroundImg: UploadedFileDto;
    };

    @ApiProperty({
        description: '이메일',
        type: String,
        example: 'test@test.com',
    })
    readonly email: string;
}

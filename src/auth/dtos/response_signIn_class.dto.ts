import { ApiProperty } from '@nestjs/swagger';

export class ResponseSignInClassDto {
    @ApiProperty({
        title: '엑세스토큰',
        description: '엑세스토큰',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExL...',
        type: String,
    })
    readonly accessToken: string;
}

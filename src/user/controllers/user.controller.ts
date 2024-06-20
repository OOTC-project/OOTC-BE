import { Body, Controller, Get, HttpStatus, Inject, Patch, Req, UseGuards } from '@nestjs/common';
import { USER_INBOUND_PORT, UserInboundPort } from '../inbound-port/user.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ResponseFindInformationUserDto } from '../dtos/response_findInformation_user.dto';
import { Member } from '@prisma/client';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { RequestUpdateUserDto } from '../dtos/request_update_user.dto';
import { UploadToS3 } from '../../common/decorator';

@Controller('user')
export class UserController {
    constructor(
        @Inject(USER_INBOUND_PORT)
        private readonly userInboundPort: UserInboundPort,
    ) {}

    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '회원정보 조회하기', description: '회원정보 조회하기' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindInformationUserDto,
            exampleTitle: '회원정보 조회하기!',
            exampleDescription: '회원 정보 조회 성공!',
        },
    ])
    async findInformationOfUser(@Req() { user }): Promise<ResponseFindInformationUserDto> {
        const userInformation: Member = await this.userInboundPort.findInformationOfUser(user);
        return plainToClass(ResponseFindInformationUserDto, userInformation);
    }

    @Patch()
    @UseGuards(JwtGuard)
    @ApiBody({ type: RequestUpdateUserDto })
    @UploadToS3([{ name: 'profileImg' }, { name: 'backgroundImg' }])
    @ApiOperation({ summary: '회원정보 수정하기', description: '회원정보 수정하기' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindInformationUserDto,
            exampleTitle: '회원정보 조회하기!',
            exampleDescription: '회원 정보 조회 성공!',
        },
    ])
    async update(@Req() { user }, @Body() userUpdate: RequestUpdateUserDto): Promise<ResponseFindInformationUserDto> {
        const update: Member = await this.userInboundPort.update(user, userUpdate);

        return plainToClass(ResponseFindInformationUserDto, update);
    }
}

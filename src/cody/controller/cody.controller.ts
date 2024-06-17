import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CODY_INBOUND_PORT, CodyInboundPort } from '../inbound-port/cody.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RequestCreateCodyDto } from '../dtos/request_create_cody.dto';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseCreateCodyDto } from '../dtos/response_create_cody.dto';
import { ResponseFindAllCodyListDto } from '../dtos/response_findAll_cody.dto';
import { ResponseFindOneCodyDto } from '../dtos/response_findOne_cody.dto';
import { ResponseUpdateCodyDto } from '../dtos/response_update_cody.dto';
import { ResponseDeleteCodyDto } from '../dtos/response_delete_cody.dto';

@Controller('cody')
export class CodyController {
    constructor(
        @Inject(CODY_INBOUND_PORT)
        private readonly codyInboundPort: CodyInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '코디 만들기', description: '코디 만들기를 진행한다.' })
    @ApiBody({ type: RequestCreateCodyDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseCreateCodyDto,
            exampleTitle: '코디 생성 성공',
            exampleDescription: '코디 생성이 성공적으로 이루어졌습니다.',
            overwriteValue: {
                id: 1,
                createdAt: '2024-06-12T03:33:08.031Z',
                fkCodyId: 1,
                fkMemberId: 1,
                clothes: {
                    id: 1,
                    name: '별이코트',
                    clothesImg: 'wecode 추억.png',
                    description: '옷 설명 업데이트',
                    position: '우리집 침대',
                    fkCategoryId: 1,
                    fkMemberId: 1,
                    createdAt: '2024-06-07T06:07:07.378Z',
                },
                cody: {
                    id: 9,
                    name: '코디이름은',
                    createdAt: '2024-06-17T01:36:18.091Z',
                    fkMemberId: 1,
                },
            },
        },
    ])
    async create(@Req() { user }, @Body() createCody: RequestCreateCodyDto): Promise<ResponseCreateCodyDto> {
        return this.codyInboundPort.create(user, createCody);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '모든 코디 조회', description: '모든 코디를 조회한다.' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindAllCodyListDto,
            exampleTitle: '모든 코디 조회 성공',
            exampleDescription: '모든 코디 조회가 성공적으로 이루어졌습니다.',
            overwriteValue: [
                {
                    id: 1,
                    fkCodyId: 3,
                    fkClothesId: 1,
                    createdAt: '2024-06-07T07:47:04.129Z',
                    cody: {
                        id: 3,
                        name: '코디이름은',
                        createdAt: '2024-06-07T07:47:04.123Z',
                        fkMemberId: 1,
                    },
                    clothes: {
                        id: 1,
                        name: '별이코트',
                        clothesImg: 'wecode 추억.png',
                        description: '옷 설명 업데이트',
                        position: '우리집 침대',
                        fkCategoryId: 1,
                        fkMemberId: 1,
                        createdAt: '2024-06-07T06:07:07.378Z',
                    },
                },
                {
                    id: 2,
                    fkCodyId: 4,
                    fkClothesId: 1,
                    createdAt: '2024-06-17T01:32:11.537Z',
                    cody: {
                        id: 4,
                        name: '코디이름은',
                        createdAt: '2024-06-17T01:32:11.532Z',
                        fkMemberId: 1,
                    },
                    clothes: {
                        id: 1,
                        name: '별이코트',
                        clothesImg: 'wecode 추억.png',
                        description: '옷 설명 업데이트',
                        position: '우리집 침대',
                        fkCategoryId: 1,
                        fkMemberId: 1,
                        createdAt: '2024-06-07T06:07:07.378Z',
                    },
                },
                // 추가 예시 데이터...
            ],
        },
    ])
    async findAll(@Req() { user }): Promise<ResponseFindAllCodyListDto> {
        return this.codyInboundPort.findAll(user);
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '특정 코디 조회', description: '특정 코디를 조회한다.' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseFindOneCodyDto,
            exampleTitle: '코디 생성 성공',
            exampleDescription: '코디 생성이 성공적으로 이루어졌습니다.',
            overwriteValue: {
                id: 1,
                createdAt: '2024-06-12T03:33:08.031Z',
                fkCodyId: 1,
                fkMemberId: 1,
                clothes: {
                    id: 1,
                    name: '별이코트',
                    clothesImg: 'wecode 추억.png',
                    description: '옷 설명 업데이트',
                    position: '우리집 침대',
                    fkCategoryId: 1,
                    fkMemberId: 1,
                    createdAt: '2024-06-07T06:07:07.378Z',
                },
                cody: {
                    id: 9,
                    name: '코디이름은',
                    createdAt: '2024-06-17T01:36:18.091Z',
                    fkMemberId: 1,
                },
            },
        },
    ])
    async findOne(@Param('id') id: number): Promise<ResponseFindOneCodyDto> {
        return this.codyInboundPort.findOne(id);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '코디 수정하기', description: '코디 수정하기를 진행한다.' })
    @ApiBody({ type: RequestUpdateCodyDto })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseUpdateCodyDto,
            exampleTitle: '코디 생성 성공',
            exampleDescription: '코디 생성이 성공적으로 이루어졌습니다.',
            overwriteValue: {
                id: 1,
                createdAt: '2024-06-12T03:33:08.031Z',
                fkCodyId: 1,
                fkMemberId: 1,
                clothes: {
                    id: 1,
                    name: '별이코트',
                    clothesImg: 'wecode 추억.png',
                    description: '옷 설명 업데이트',
                    position: '우리집 침대',
                    fkCategoryId: 1,
                    fkMemberId: 1,
                    createdAt: '2024-06-07T06:07:07.378Z',
                },
                cody: {
                    id: 9,
                    name: '코디이름은',
                    createdAt: '2024-06-17T01:36:18.091Z',
                    fkMemberId: 1,
                },
            },
        },
    ])
    async update(@Param('id') id: number, @Body() updateCody: RequestUpdateCodyDto): Promise<ResponseUpdateCodyDto> {
        return this.codyInboundPort.update(id, updateCody);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: '코디 삭제하기', description: '코디 삭제하기를 진행한다.' })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseDeleteCodyDto,
            exampleTitle: '코디 생성 성공',
            exampleDescription: '코디 생성이 성공적으로 이루어졌습니다.',
            overwriteValue: {
                id: 1,
                createdAt: '2024-06-12T03:33:08.031Z',
                fkCodyId: 1,
                fkMemberId: 1,
                clothes: {
                    id: 1,
                    name: '별이코트',
                    clothesImg: 'wecode 추억.png',
                    description: '옷 설명 업데이트',
                    position: '우리집 침대',
                    fkCategoryId: 1,
                    fkMemberId: 1,
                    createdAt: '2024-06-07T06:07:07.378Z',
                },
                cody: {
                    id: 9,
                    name: '코디이름은',
                    createdAt: '2024-06-17T01:36:18.091Z',
                    fkMemberId: 1,
                },
            },
        },
    ])
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDeleteCodyDto> {
        return this.codyInboundPort.delete(id);
    }
}

import { Body, Controller, Delete, HttpStatus, Inject, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RECOMMEND_INBOUND_PORT, RecommendInboundPort } from '../inbound-port/recommend.inbound-port';
import { ApiOperation } from '@nestjs/swagger';
import { SuccessResponse } from '../../common/decorator/SuccessResponse.decorator';
import { ResponseRecommendDto } from '../dtos/response_recommend.dto';

@Controller('recommend')
export class RecommendController {
    constructor(
        @Inject(RECOMMEND_INBOUND_PORT)
        private readonly recommendInboundPort: RecommendInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiOperation({
        summary: '추천 누른다',
        description: '추천 누른다',
    })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseRecommendDto,
            exampleTitle: '코디 추천 눌렀따!',
            exampleDescription: '코디를 추천해버려 버렸지 뭐야',
        },
    ])
    async doRecommend(@Req() { user }, @Body() doRecommend) {
        return this.recommendInboundPort.doRecommend(user, doRecommend);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    @ApiOperation({
        summary: '추천 뺀다',
        description: '추천 뺀다',
    })
    @SuccessResponse(HttpStatus.OK, [
        {
            model: ResponseRecommendDto,
            exampleTitle: '추천 성공!',
            exampleDescription: '추천을 버렸지 뭐야',
        },
    ])
    async minusRecommend(@Param('id', ParseIntPipe) id: number, @Body() doRecommend) {
        return this.recommendInboundPort.minusRecommend(id, doRecommend);
    }
}

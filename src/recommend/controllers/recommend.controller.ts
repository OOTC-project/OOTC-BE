import { Body, Controller, Delete, Inject, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RECOMMEND_INBOUND_PORT, RecommendInboundPort } from '../inbound-port/recommend.inbound-port';

@Controller('recommend')
export class RecommendController {
    constructor(
        @Inject(RECOMMEND_INBOUND_PORT)
        private readonly recommendInboundPort: RecommendInboundPort,
    ) {}
    @Post()
    @UseGuards(JwtGuard)
    async doRecommend(@Req() { user }, @Body() doRecommend) {
        return this.recommendInboundPort.doRecommend(user, doRecommend);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async minusRecommend(@Param('id', ParseIntPipe) id: number, @Body() doRecommend) {
        return this.recommendInboundPort.minusRecommend(id, doRecommend);
    }
}

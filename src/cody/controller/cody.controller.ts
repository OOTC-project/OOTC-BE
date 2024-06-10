import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CODY_INBOUND_PORT, CodyInboundPort } from '../inbound-port/cody.inbound-port';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { RequestCreateCodyDto } from '../dtos/request_create_cody.dto';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';

@Controller('cody')
export class CodyController {
    constructor(
        @Inject(CODY_INBOUND_PORT)
        private readonly codyInboundPort: CodyInboundPort,
    ) {}

    @Post()
    @UseGuards(JwtGuard)
    async create(@Req() { user }, @Body() createCody: RequestCreateCodyDto) {
        return this.codyInboundPort.create(user, createCody);
    }

    @Get()
    @UseGuards(JwtGuard)
    async findAll(@Req() { user }) {
        return this.codyInboundPort.findAll(user);
    }

    @Get('/:id')
    @UseGuards(JwtGuard)
    async findOne(@Param('id') id: number) {
        return this.codyInboundPort.findOne(id);
    }

    @Patch('/:id')
    @UseGuards(JwtGuard)
    async update(@Param('id') id: number, @Body() updateCody: RequestUpdateCodyDto) {
        return this.codyInboundPort.update(id, updateCody);
    }

    @Delete('/:id')
    @UseGuards(JwtGuard)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.codyInboundPort.delete(id);
    }
}

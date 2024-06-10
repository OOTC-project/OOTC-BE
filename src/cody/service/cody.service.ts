import { Inject, Injectable } from '@nestjs/common';
import { CodyInboundPort } from '../inbound-port/cody.inbound-port';
import { CODY_OUTBOUND_PORT, CodyOutboundPort } from '../outbound-port/cody.outbound-port';
import { RequestCreateCodyDto } from '../dtos/request_create_cody.dto';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';

@Injectable()
export class CodyService implements CodyInboundPort {
    constructor(
        @Inject(CODY_OUTBOUND_PORT)
        private readonly codyOutboundPort: CodyOutboundPort,
    ) {}

    async create(user, createCody: RequestCreateCodyDto) {
        return this.codyOutboundPort.create(user, createCody);
    }

    async findAll(user) {
        return this.codyOutboundPort.findAll(user);
    }

    async findOne(id: number) {
        return this.codyOutboundPort.findOne(id);
    }

    async update(id: number, updateCody: RequestUpdateCodyDto) {
        return this.codyOutboundPort.update(id, updateCody);
    }

    async delete(id: number) {
        return this.codyOutboundPort.delete(id);
    }
}

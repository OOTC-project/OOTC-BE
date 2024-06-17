import { Inject, Injectable } from '@nestjs/common';
import { CodyInboundPort } from '../inbound-port/cody.inbound-port';
import { CODY_OUTBOUND_PORT, CodyOutboundPort } from '../outbound-port/cody.outbound-port';
import { RequestCreateCodyDto } from '../dtos/request_create_cody.dto';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';
import { Cody, Member } from '@prisma/client';

@Injectable()
export class CodyService implements CodyInboundPort {
    constructor(
        @Inject(CODY_OUTBOUND_PORT)
        private readonly codyOutboundPort: CodyOutboundPort,
    ) {}

    async create(user: Member, createCody: RequestCreateCodyDto): Promise<Cody> {
        return this.codyOutboundPort.create(user, createCody);
    }

    async findAll(user: Member): Promise<Cody[]> {
        return this.codyOutboundPort.findAll(user);
    }

    async findOne(id: number): Promise<Cody> {
        return this.codyOutboundPort.findOne(id);
    }

    async update(id: number, updateCody: RequestUpdateCodyDto): Promise<Cody> {
        return this.codyOutboundPort.update(id, updateCody);
    }

    async delete(id: number): Promise<Cody> {
        return this.codyOutboundPort.delete(id);
    }
}

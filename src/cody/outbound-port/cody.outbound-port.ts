import { CodyWithDetails, RequestCreateCody } from '../types/cody.type';
import { Cody, Member } from '@prisma/client';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';

export const CODY_OUTBOUND_PORT = 'CODY_OUTBOUND_PORT' as const;

export interface CodyOutboundPort {
    create(user: Member, createCody: RequestCreateCody): Promise<CodyWithDetails>;

    findAll(user: Member): Promise<CodyWithDetails[]>;

    findOne(id: number): Promise<CodyWithDetails | null>;

    update(id: number, updateCody: RequestUpdateCodyDto): Promise<CodyWithDetails>;

    delete(id: number): Promise<Cody>;
}

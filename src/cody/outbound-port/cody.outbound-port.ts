import { RequestCreateCody } from '../types/cody.type';

export const CODY_OUTBOUND_PORT = 'CODY_OUTBOUND_PORT' as const;

export interface CodyOutboundPort {
    create(user, createCody: RequestCreateCody);

    findAll(user);

    findOne(id: number);

    // update(id: number, updateCody);
}

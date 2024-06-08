import { RequestCreateCody } from '../types/cody.type';

export const CODY_INBOUND_PORT = 'CODY_INBOUND_PORT' as const;

export interface CodyInboundPort {
    create(user, createCody: RequestCreateCody);

    findAll(user);

    findOne(id: number);

    // update(id: number, updateCody);

    delete(id: number);
}

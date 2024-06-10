import { RequestCreateCody } from '../types/cody.type';
import { RequestUpdateCodyDto } from '../dtos/request_update_cody.dto';

export const CODY_OUTBOUND_PORT = 'CODY_OUTBOUND_PORT' as const;

export interface CodyOutboundPort {
    create(user, createCody: RequestCreateCody);

    findAll(user);

    findOne(id: number);

    update(id: number, updateCody: RequestUpdateCodyDto);

    delete(id: number);
}

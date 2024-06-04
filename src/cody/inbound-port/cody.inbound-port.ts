export const CODY_INBOUND_PORT = 'CODY_INBOUND_PORT' as const;

export interface CodyInboundPort {
    create();

    findAll();

    findOne();

    update();

    delete();
}

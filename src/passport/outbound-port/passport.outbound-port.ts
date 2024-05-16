import { Strategy } from 'passport-local';

export const PASSPORT_OUTBOUND_PORT = 'PASSPORT_OUTBOUND_PORT' as const;

export interface PassportOutboundPort {
    use(strategy: Strategy);
}

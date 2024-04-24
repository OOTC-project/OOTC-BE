export const CONFIG_OUTBOUND_PORT = 'CONFIG_OUTBOUND_PORT' as const;

export interface ConfigOutboundPort {
    getConfigByKey(key: string): string;
}

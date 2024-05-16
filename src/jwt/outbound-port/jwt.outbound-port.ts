export const JWT_OUTBOUND_PORT = 'JWT_OUTBOUND_PORT' as const;

export interface JwtOutboundPort {
    sign(payload: string | object | Buffer, options?: any): string;

    verify(token: string, options?: any): any;
}

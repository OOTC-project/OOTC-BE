import { Injectable } from '@nestjs/common';
import { JwtOutboundPort } from '../outbound-port/jwt.outbound-port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtOutboundPort {
    constructor(private readonly jwtService: JwtService) {}

    sign(payload: string | object | Buffer, options?: any): string {
        if (typeof payload === 'string') {
            return this.jwtService.sign(payload, options);
        } else if (typeof payload === 'object' || Buffer.isBuffer(payload)) {
            return this.jwtService.sign(payload, options);
        } else {
            throw new Error('Invalid payload type');
        }
    }

    verify(token: string, options?: any): any {
        return this.jwtService.verify(token, options);
    }
}

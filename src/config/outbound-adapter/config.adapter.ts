import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigOutboundPort } from '../outbound-port/config.outbound-port';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigAdapter implements ConfigOutboundPort {
    constructor(private readonly configService: ConfigService) {}

    getConfigByKey(key: string): string {
        if (!this.configService.get<string>(key)) {
            throw new InternalServerErrorException('해당 key의 환경변수가 없어요');
        }
        return this.configService.get<string>(key);
    }
}

import { Inject, Injectable } from '@nestjs/common';
import { OpenAiInboundPort } from '../inbound-port/open-ai.inbound-port';
import { HttpService } from '@nestjs/axios';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OpenAiService implements OpenAiInboundPort {
    constructor(
        private httpService: HttpService,
        @Inject(CONFIG_OUTBOUND_PORT)
        private configAdapter: ConfigOutboundPort,
    ) {}

    // https://openweathermap.org/current
    // ! 해당 API 문서 보고 진행
    async getWeather(city: string): Promise<any> {
        const apiKey = this.configAdapter.getConfigByKey('OPEN_WEATHER_API_KEY');

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}&units=metric`;
        const urlOfLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city},null,KR&limit=1&appid=${apiKey}&units=metric`;
        console.log('=>(open-ai.service.ts:22) urlOfLocation', urlOfLocation);
        const response = await lastValueFrom(this.httpService.get(url));
        const response2 = await lastValueFrom(this.httpService.get(urlOfLocation));
        console.log('=>(open-ai.service.ts:24) response2', response2.data);

        return response.data;
    }
}

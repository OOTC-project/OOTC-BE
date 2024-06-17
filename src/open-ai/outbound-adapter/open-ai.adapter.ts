import { Injectable } from '@nestjs/common';
import { OpenAiOutboundPort } from '../outbound-port/open-ai.outbound-port';

@Injectable()
export class OpenAiAdapter implements OpenAiOutboundPort {
    constructor() {}

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric
    getWeatherJson = function (url: string, callback: any) {};
}

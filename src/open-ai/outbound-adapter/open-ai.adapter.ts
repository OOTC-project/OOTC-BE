import { Inject, Injectable } from '@nestjs/common';
import { OpenAiOutboundPort } from '../outbound-port/open-ai.outbound-port';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CONFIG_OUTBOUND_PORT, ConfigOutboundPort } from '../../config/outbound-port/config.outbound-port';
import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';
import Choice = ChatCompletion.Choice;

@Injectable()
export class OpenAiAdapter implements OpenAiOutboundPort {
    constructor(
        private httpService: HttpService,
        @Inject(CONFIG_OUTBOUND_PORT)
        private configAdapter: ConfigOutboundPort,
    ) {}

    async recommendLook({ city, country }): Promise<Choice> {
        const openai = new OpenAI({
            apiKey: this.configAdapter.getConfigByKey('OPEN_AI_API_KEY'),
        });

        const weatherData = await this.getWeather({ city, country });

        const messages: { role: 'system' | 'user'; content: string }[] = [
            {
                role: 'system',
                content: `You are a helpful assistant that provides clothing recommendations based on the weather.`,
            },
            {
                role: 'user',
                content: `The current weather in ${city}, ${country} is as follows:
                Temperature: ${weatherData.main.temp}°C,
                Feels like: ${weatherData.main.feels_like}°C,
                Min temperature: ${weatherData.main.temp_min}°C,
                Max temperature: ${weatherData.main.temp_max}°C,
                Pressure: ${weatherData.main.pressure} hPa,
                Humidity: ${weatherData.main.humidity}%,
                Wind speed: ${weatherData.wind.speed} m/s,
                Wind direction: ${weatherData.wind.deg}°,
                Cloudiness: ${weatherData.clouds.all}%,
                Weather description: ${weatherData.weather[0].description}.
                What should I wear today? Please provide the response in both English and Korean. The Korean translation should be accurate and natural.`,
            },
        ];

        const completion = await openai.chat.completions.create({
            messages: messages as any,
            model: 'gpt-3.5-turbo',
        });

        return completion.choices[0];
    }

    private async getWeather({ city, country }): Promise<any> {
        const apiKey = this.configAdapter.getConfigByKey('OPEN_WEATHER_API_KEY');
        const locationData = await this.getCoordinates({ city, country });

        if (!locationData) {
            throw new Error('Location data not found');
        }

        const { lat, lon } = locationData;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await lastValueFrom(this.httpService.get(url));

        return response.data;
    }

    private async getCoordinates({ city, country }): Promise<any> {
        const apiKey = this.configAdapter.getConfigByKey('OPEN_WEATHER_API_KEY');
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;

        const response = await lastValueFrom(this.httpService.get(url));
        return response.data[0];
    }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOperation({ description: 'health check', summary: 'health Check' })
    @ApiResponse({ description: 'hello world~' })
    getHello(): string {
        return this.appService.getHello();
    }
}

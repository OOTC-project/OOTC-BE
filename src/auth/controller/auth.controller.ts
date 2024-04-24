import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor() {}


    @Post('signUp')
    async signUp(@Body() userData: ) {

    }
}

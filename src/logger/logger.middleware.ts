import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger: Logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => this.logger.log(`[${req.method}]${req.ip}:${req.originalUrl} => ${res.statusCode} | ${res.statusMessage}}`));
        next();
    }
}

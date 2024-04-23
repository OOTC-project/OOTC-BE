import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error = exception.getResponse() as string | { error: string; statusCode: number; message: string | string[] };

        if (typeof error === 'string') {
            response.status(status).json({
                success: false,
                statusCode: status,
                timeStamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                path: request.url,
                error,
            });
        } else {
            response.status(status).json({
                success: false,
                timeStamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                ...error,
            });
        }
    }
}

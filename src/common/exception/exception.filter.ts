import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorResponse = exception.getResponse() as
            | string
            | {
                  error: string;
                  statusCode: number;
                  message: string | string[];
              };

        let errorMessage: string;
        let errorType: string;

        if (typeof errorResponse === 'string') {
            errorMessage = errorResponse;
            errorType = 'Error';
        } else {
            if (Array.isArray(errorResponse.message)) {
                errorMessage = errorResponse.message.join(', ');
            } else {
                errorMessage = errorResponse.message;
            }
            errorType = errorResponse.error || 'Error';
        }

        response.status(status).json({
            statusCode: status,
            timeStamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            message: errorMessage,
            error: errorType,
        });
    }
}

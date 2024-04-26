import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = this.formatMessage(exception);

        if (exception.code === 'P2002') {
            const status = HttpStatus.CONFLICT;
            response.status(status).json({
                statusCode: status,
                message: message,
            });
        } else {
            // Default to the base class method for other types of errors
            super.catch(exception, host);
        }
    }

    private formatMessage(exception: Prisma.PrismaClientKnownRequestError): string {
        // Safely extract fields if available
        if (exception.code === 'P2002' && exception.meta && this.isArrayOfString(exception.meta['target'])) {
            const fields = exception.meta['target'].join(', ');
            return `Unique constraint failed for the fields: ${fields}. ${exception.message}`;
        }
        return exception.message.replace(/\n/g, '');
    }

    private isArrayOfString(value: any): value is string[] {
        return Array.isArray(value) && value.every((item) => typeof item === 'string');
    }
}

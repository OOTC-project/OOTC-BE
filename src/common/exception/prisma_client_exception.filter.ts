import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import dayjs from 'dayjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = this.formatMessage(exception);
        const status = this.getStatus(exception);

        response.status(status).json({
            statusCode: status,
            timeStamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            message: message,
            error: 'PrismaClientKnownRequestError',
        });
    }

    private formatMessage(exception: Prisma.PrismaClientKnownRequestError): string {
        console.log(exception.meta);
        switch (exception.code) {
            case 'P2002':
                if (exception.meta && this.isArrayOfString(exception.meta['target'])) {
                    const fields = exception.meta['target'].join(', ');
                    return `해당 ${fields}을(를) 가진 사용자가 이미 존재합니다. 다른 ${fields}을(를) 선택해주세요.`;
                }
                return `${exception.meta?.target} 유니크 제약 조건이 실패했습니다.`;
            case 'P2003':
                return `필드 ${exception.meta?.target}에 대한 외래 키 제약 조건이 실패했습니다.`;
            case 'P2004':
                return '데이터베이스에 제약 조건이 실패했습니다.';
            case 'P2005':
                return `필드 ${exception.meta?.target}에 제공된 값이 잘못되었습니다.`;
            case 'P2006':
                return '필드에 제공된 값이 너무 깁니다.';
            case 'P2007':
                return '필드에 제공된 값이 너무 짧습니다.';
            case 'P2008':
                return '서버 측 오류로 인해 쿼리 작업이 실패했습니다.';
            case 'P2009':
                return '쿼리를 처리하는 동안 구문 분석 오류가 발생했습니다.';
            case 'P2010':
                return '트랜잭션이 시간 초과로 실패했습니다.';
            case 'P2022':
                return '데이터베이스의 컬럼이 존재하지 않습니다.';
            default:
                return exception.message.replace(/\n/g, '');
        }
    }

    private getStatus(exception: Prisma.PrismaClientKnownRequestError): number {
        switch (exception.code) {
            case 'P2002':
                return HttpStatus.CONFLICT;
            case 'P2003':
            case 'P2004':
            case 'P2005':
            case 'P2006':
            case 'P2007':
                return HttpStatus.BAD_REQUEST;
            case 'P2008':
            case 'P2009':
            case 'P2010':
            case 'P2022':
                return HttpStatus.INTERNAL_SERVER_ERROR;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private isArrayOfString(value: any): value is string[] {
        return Array.isArray(value) && value.every((item) => typeof item === 'string');
    }
}

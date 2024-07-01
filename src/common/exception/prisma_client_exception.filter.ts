import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = this.getStatus(exception);
        const errorResponse = this.formatMessage(exception);

        response.status(status).json({
            statusCode: status,
            timeStamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            path: request.url,
            message: errorResponse.message,
            error: errorResponse.error,
        });
    }

    private formatMessage(exception: Prisma.PrismaClientKnownRequestError): { error: string; message: string } {
        let errorMessage: string;
        const errorType: string = 'PrismaClientKnownRequestError';

        if (exception.code === 'P2002') {
            if (exception.meta && this.isArrayOfString(exception.meta['target'])) {
                const fields = exception.meta['target'].join(', ');
                errorMessage = `해당 ${fields}을(를) 가진 사용자가 이미 존재합니다. 다른 ${fields}을(를) 선택해주세요.`;
            } else {
                const fields = exception.meta;
                errorMessage = `유니크 제약 조건이 실패했습니다. 중복된 값이 존재합니다. -${fields.modelName}의 ${fields.target}가 이미 있습니다`;
            }
        } else {
            switch (exception.code) {
                case 'P2003':
                    errorMessage = `필드 ${exception.meta?.target}에 대한 외래 키 제약 조건이 실패했습니다.`;
                    break;
                case 'P2004':
                    errorMessage = '데이터베이스에 제약 조건이 실패했습니다.';
                    break;
                case 'P2005':
                    errorMessage = `필드 ${exception.meta?.target}에 제공된 값이 잘못되었습니다.`;
                    break;
                case 'P2006':
                    errorMessage = '필드에 제공된 값이 너무 깁니다.';
                    break;
                case 'P2007':
                    errorMessage = '필드에 제공된 값이 너무 짧습니다.';
                    break;
                case 'P2008':
                    errorMessage = '서버 측 오류로 인해 쿼리 작업이 실패했습니다.';
                    break;
                case 'P2009':
                    errorMessage = '쿼리를 처리하는 동안 구문 분석 오류가 발생했습니다.';
                    break;
                case 'P2010':
                    errorMessage = '트랜잭션이 시간 초과로 실패했습니다.';
                    break;
                case 'P2022':
                    errorMessage = '데이터베이스의 컬럼이 존재하지 않습니다.';
                    break;
                default:
                    errorMessage = exception.message.replace(/\n/g, '');
                    break;
            }
        }

        return { error: errorType, message: errorMessage };
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

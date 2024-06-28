import { CallHandler, ExecutionContext, HttpStatus, Inject, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseResult } from '../response/result.response';
import { instanceToPlain } from 'class-transformer';
import { CONFIG_OUTBOUND_PORT } from '../../config/outbound-port/config.outbound-port';
import { ConfigAdapter } from '../../config/outbound-adapter/config.adapter';

export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseResult<T>> {
    constructor(
        @Inject(CONFIG_OUTBOUND_PORT)
        private readonly configAdapter: ConfigAdapter,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<ResponseResult<T>> | any {
        return next.handle().pipe(
            map((data) => {
                const { url } = context.getArgByIndex(0);
                const imagePrefix = this.configAdapter.getConfigByKey('AWS_IMAGE_PREFIX');

                const processedData = this.addImagePrefix(instanceToPlain(data), imagePrefix);

                switch (url.includes('sweet')) {
                    case true:
                        console.log(processedData);
                        return processedData;
                    default:
                        return new ResponseResult(HttpStatus.OK, processedData);
                }
            }),
        );
    }

    private addImagePrefix(data: any, prefix: string): any {
        if (typeof data === 'object' && data !== null) {
            for (const key in data) {
                if (typeof data[key] === 'string' && this.isImageKey(key)) {
                    data[key] = `${prefix}${data[key]}`;
                } else if (typeof data[key] === 'object' && data[key] !== null) {
                    data[key] = this.addImagePrefix(data[key], prefix);
                }
            }
        }
        return data;
    }

    private isImageKey(key: string): boolean {
        const imagePatterns = ['img', 'image', 'picture', 'Img']; // 이미지 관련 키 패턴
        return imagePatterns.some((pattern) => key.toLowerCase().includes(pattern));
    }
}

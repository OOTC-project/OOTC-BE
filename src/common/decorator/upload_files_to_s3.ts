import { applyDecorators, UseInterceptors, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { Observable } from 'rxjs';

export function UploadToS3(fields: { name: string; maxCount?: number }[]) {
    class S3UploadInterceptor implements NestInterceptor {
        async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
            const request = context.switchToHttp().getRequest();
            const s3 = new S3({
                region: 'ap-northeast-2',
            });

            const uploadPromises = fields
                .map((field) => {
                    return (request.files[field.name] || []).map((file) =>
                        s3
                            .upload({
                                Bucket: 'ootc', // Specify your bucket name here
                                Key: file.originalname,
                                Body: file.buffer,
                                ACL: 'authenticated-read', // Adjust the ACL according to your requirements
                            })
                            .promise()
                            .then((result) => ({ fieldName: field.name, url: result.Location })),
                    );
                })
                .flat();

            const uploadResults = await Promise.all(uploadPromises);

            // Group URLs by field name
            request.body.s3Urls = uploadResults.reduce((acc, result) => {
                (acc[result.fieldName] = acc[result.fieldName] || []).push(result.url);
                return acc;
            }, {});

            return next.handle();
        }
    }

    return applyDecorators(UseInterceptors(FileFieldsInterceptor(fields), S3UploadInterceptor));
}

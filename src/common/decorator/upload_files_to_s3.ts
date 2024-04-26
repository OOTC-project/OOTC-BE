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

            // Prepare to upload files to S3 and convert array to object
            const uploadPromises = fields.map((field) => {
                const file = request.files[field.name][0]; // Take the first file in the array
                return s3
                    .upload({
                        Bucket: 'ootc',
                        Key: file.originalname,
                        Body: file.buffer,
                        ACL: 'authenticated-read',
                        ContentType: file.mimetype,
                    })
                    .promise()
                    .then((result) => ({
                        fieldName: field.name,
                        fileData: {
                            fieldname: file.fieldname,
                            originalname: file.originalname,
                            encoding: file.encoding,
                            mimetype: file.mimetype,
                            size: file.size,
                            buffer: file.buffer, // It is usually not advisable to keep the buffer here due to size and security concerns
                            url: result.Location,
                        },
                    }));
            });

            const uploadResults = await Promise.all(uploadPromises);

            // Convert array of results to an object keyed by field names
            request.body.uploadedFiles = uploadResults.reduce((acc, result) => {
                acc[result.fieldName] = result.fileData; // Assign the file data directly to the field name
                return acc;
            }, {});

            return next.handle();
        }
    }

    return applyDecorators(UseInterceptors(FileFieldsInterceptor(fields), S3UploadInterceptor));
}

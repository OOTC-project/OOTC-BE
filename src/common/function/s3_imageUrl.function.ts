import * as process from 'node:process';

export function s3ImageUrlFunction(originalName: string): string {
    return `${process.env.AWS_IMAGE_PREFIX}${originalName}`;
}

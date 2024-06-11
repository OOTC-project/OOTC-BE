export class SimpleHttpExceptionErrorResponseDto {
    statusCode: number;
    timeStamp: string;
    path: string;
    message: string;
    error: string;

    constructor(statusCode: number, error: string, message: string) {
        this.statusCode = statusCode;
        this.timeStamp = new Date().toISOString();
        this.message = message;
        this.error = error;
    }
}

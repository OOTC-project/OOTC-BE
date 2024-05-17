export class ResponseFindIdDto {
    userId: string;

    constructor(responseOfFindId: ResponseFindIdDto) {
        this.userId = responseOfFindId.userId;
    }
}

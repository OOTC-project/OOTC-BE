export interface BaseColumnInterface {
    id: number;
    createdAt: string | Date;
}

// 정의한 인터페이스
export interface UploadedFileData {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer?: Buffer; // buffer는 보통 보안 및 성능 문제로 포함하지 않습니다.
    url: string;
}

export interface AWSS3Type {
    [fieldName: string]: UploadedFileData;
}

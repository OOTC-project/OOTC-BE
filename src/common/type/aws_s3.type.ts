export interface AWSS3Type {
    profileImg: s3ObjectType[];
    backgroundImg: s3ObjectType[];
}

export interface s3ObjectType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    bucket: Buffer;
    size: number;
}

import { PartialType } from '@nestjs/swagger';
import { RequestCreateCodyDto } from './request_create_cody.dto';

export class RequestUpdateCodyDto extends PartialType(RequestCreateCodyDto) {}

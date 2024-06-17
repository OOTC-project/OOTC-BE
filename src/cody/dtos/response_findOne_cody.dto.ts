import { PartialType } from '@nestjs/swagger';
import { ResponseCreateCodyDto } from './response_create_cody.dto';

export class ResponseFindOneCodyDto extends PartialType(ResponseCreateCodyDto) {}

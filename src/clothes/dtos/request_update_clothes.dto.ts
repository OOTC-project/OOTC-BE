import { PartialType } from '@nestjs/swagger';
import { RequestCreateClothesDto } from './request_create_clothes.dto';

export class RequestUpdateClothesDto extends PartialType(RequestCreateClothesDto) {}

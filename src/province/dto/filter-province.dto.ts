import { PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';

export class FilterProvinceDto extends PartialType(CreateProvinceDto) {}

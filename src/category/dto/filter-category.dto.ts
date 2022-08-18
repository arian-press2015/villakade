import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class FilterCategoryDto extends PartialType(CreateCategoryDto) {}

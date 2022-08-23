import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  Category,
  FilterCategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Category' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Category',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description:
      'category already exists|title must be a string|fa_title must be a string|title is required|fa_title is required',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'owner not found',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: [Category],
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
  })
  @Get('count')
  count(@Query() filterCategoryDto: FilterCategoryDto): Promise<number> {
    return this.categoryService.getCount(filterCategoryDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Category],
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
  })
  @Get()
  findAll(@Query() filterCategoryDto: FilterCategoryDto): Promise<Category[]> {
    return this.categoryService.findAll(filterCategoryDto);
  }

  @ApiOperation({ summary: 'Get the Category data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Category associated with given id',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'category not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Category' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Category',
    type: Category,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'category not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Category' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Category',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'category not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.categoryService.remove(+id);
  }
}

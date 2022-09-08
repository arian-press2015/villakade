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
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryImageService } from './categoryImage.service';
import {
  CategoryImage,
  FilterCategoryImageDto,
  CreateCategoryImageDto,
  UpdateCategoryImageDto,
} from './dto';
import { OwnerJwtGuard } from '../auth/guard';

@ApiTags('CategoryImage')
@Controller('categoryImage')
export class CategoryImageController {
  constructor(private readonly categoryImageService: CategoryImageService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new CategoryImage' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new CategoryImage',
    type: CategoryImage,
  })
  @ApiResponse({
    status: 400,
    description:
      'categoryimage already exists|category_id is required|category_id must be a positive number|url is required' +
      '|url must be a string|width is required|width must be a positive number|height is required|height must be a positive number',
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
  create(
    @Body() createCategoryImageDto: CreateCategoryImageDto,
  ): Promise<CategoryImage> {
    return this.categoryImageService.create(createCategoryImageDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the CategoryImages' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'category_id must be a positive number',
  })
  @Get('count')
  count(
    @Query() filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<number> {
    return this.categoryImageService.getCount(filterCategoryImageDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the CategoryImages' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [CategoryImage],
  })
  @ApiResponse({
    status: 400,
    description: 'category_id must be a positive number',
  })
  @Get()
  findAll(
    @Query() filterCategoryImageDto: FilterCategoryImageDto,
  ): Promise<CategoryImage[]> {
    return this.categoryImageService.findAll(filterCategoryImageDto);
  }

  @ApiOperation({ summary: 'Get the CategoryImage data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the CategoryImage associated with given id',
    type: CategoryImage,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'categoryimage not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryImage> {
    return this.categoryImageService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current CategoryImage' })
  @ApiResponse({
    status: 200,
    description: 'Updates current CategoryImage',
    type: CategoryImage,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'categoryimage not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryImageDto: UpdateCategoryImageDto,
  ): Promise<CategoryImage> {
    return this.categoryImageService.update(+id, updateCategoryImageDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current CategoryImage' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current CategoryImage',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'categoryimage not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryImageService.remove(+id);
  }
}

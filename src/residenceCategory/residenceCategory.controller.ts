import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResidenceCategoryService } from './residenceCategory.service';
import {
  ResidenceCategory,
  FilterResidenceCategoryDto,
  CreateResidenceCategoryDto,
} from './dto';
import { DeleteResidenceCategoryDto } from './dto/delete-residenceCategory.dto';

@ApiTags('ResidenceCategory')
@Controller('residenceCategory')
export class ResidenceCategoryController {
  constructor(
    private readonly residenceCategoryService: ResidenceCategoryService,
  ) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceCategory' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceCategory',
    type: ResidenceCategory,
  })
  @ApiResponse({
    status: 400,
    description:
      'residencecategory already exists|residence_id must be a positive number|category_id must be a positive number' +
      '|category_id is required|residence_id is required',
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
    @Body() createResidenceCategoryDto: CreateResidenceCategoryDto,
  ): Promise<ResidenceCategory> {
    return this.residenceCategoryService.create(createResidenceCategoryDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceCategorys' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceCategory],
  })
  @ApiResponse({
    status: 400,
    description:
      'category_id must be a positive number|residence_id must be a positive number',
  })
  @Get()
  findAll(
    @Query() filterResidenceCategoryDto: FilterResidenceCategoryDto,
  ): Promise<ResidenceCategory[]> {
    return this.residenceCategoryService.findAll(filterResidenceCategoryDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current ResidenceCategory' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current ResidenceCategory',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencecategory not found|owner not found',
  })
  @Delete()
  remove(
    @Body() deleteResidenceCategoryDto: DeleteResidenceCategoryDto,
  ): Promise<boolean> {
    return this.residenceCategoryService.remove(deleteResidenceCategoryDto);
  }
}

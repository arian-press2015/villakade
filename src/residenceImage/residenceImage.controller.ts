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
import { ResidenceImageService } from './residenceImage.service';
import {
  ResidenceImage,
  FilterResidenceImageDto,
  CreateResidenceImageDto,
  UpdateResidenceImageDto,
} from './dto';

@ApiTags('ResidenceImage')
@Controller('residenceImage')
export class ResidenceImageController {
  constructor(private readonly residenceImageService: ResidenceImageService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceImage' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceImage',
    type: ResidenceImage,
  })
  @ApiResponse({
    status: 400,
    description:
      'ResidenceImage already exists|Title must be a string|width must be a string',
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No User found',
  })
  @Post()
  create(
    @Body() createResidenceImageDto: CreateResidenceImageDto,
  ): Promise<ResidenceImage> {
    return this.residenceImageService.create(createResidenceImageDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceImages' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceImage],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|width must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceImageDto: FilterResidenceImageDto,
  ): Promise<ResidenceImage[]> {
    return this.residenceImageService.findAll(filterResidenceImageDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceImage data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceImage associated with given id',
    type: ResidenceImage,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceImage found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceImage> {
    return this.residenceImageService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current ResidenceImage' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceImage',
    type: ResidenceImage,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceImage found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceImageDto: UpdateResidenceImageDto,
  ): Promise<ResidenceImage> {
    return this.residenceImageService.update(+id, updateResidenceImageDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current ResidenceImage' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current ResidenceImage',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceImage found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceImageService.remove(+id);
  }
}

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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
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
import { HostJwtGuard } from '../auth/guard';
import multerConfig from '../shared/multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@ApiTags('ResidenceImage')
@Controller('residenceImage')
export class ResidenceImageController {
  constructor(private readonly residenceImageService: ResidenceImageService) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file', multerConfig('residenceImage')))
  @ApiConsumes('multipart/form-data')
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
      'residenceimage already exists|residence_id is required|residence_id must be a positive number|url is required' +
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
    @Body() createResidenceImageDto: CreateResidenceImageDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResidenceImage> {
    const url = file.path.substring(join(__dirname, '../..').length);
    return this.residenceImageService.create(createResidenceImageDto, url);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceImages' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'residence_id must be a positive number',
  })
  @Get('count')
  count(
    @Query() filterResidenceImageDto: FilterResidenceImageDto,
  ): Promise<number> {
    return this.residenceImageService.getCount(filterResidenceImageDto);
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
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|residence_id must be a positive number',
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
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceimage not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceImage> {
    return this.residenceImageService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceImage' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceImage',
    type: ResidenceImage,
  })
  @ApiResponse({
    status: 400,
    description: 'residence_id must be a positive number',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceimage not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceImageDto: UpdateResidenceImageDto,
  ): Promise<ResidenceImage> {
    return this.residenceImageService.update(+id, updateResidenceImageDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceImage' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceImage',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceimage not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceImageService.remove(+id);
  }
}

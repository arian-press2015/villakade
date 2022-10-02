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
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResidenceService } from './residence.service';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
  CreateResidenceCategoryDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('Residence')
@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new Residence' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Residence',
    type: Residence,
  })
  @ApiResponse({
    status: 400,
    description:
      'residence already exists|host_id must be a positive number|host_id is required|title must be a string|type_id must be a positive number' +
      '|type_id is required|location is required|location must be a string|title is required|city_id must be a positive number|city_id is required' +
      '|price must be a positive number|price is required|activation status is required|activation status must be a boolean',
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
  create(@Body() createResidenceDto: CreateResidenceDto): Promise<Residence> {
    return this.residenceService.create(createResidenceDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new ResidenceCategory' })
  @ApiResponse({
    status: 204,
    description: 'Creates new ResidenceCategory',
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceCategory already exists|residence not found|category not found|residence_id is required|category_id is required' +
      '|residence_id must be a positive number|category_id must be a number array',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'host not found',
  })
  @HttpCode(204)
  @Post('category')
  createResidenceCategory(
    @Body() createResidenceCategoryDto: CreateResidenceCategoryDto,
  ): Promise<void> {
    return this.residenceService.createResidenceCategory(
      createResidenceCategoryDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Residences' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'host_id must be a positive number|type_id must be a positive number|location must be a string|city_id must be a positive number' +
      '|price must be a positive number|activation status must be a boolean',
  })
  @Get('count')
  count(@Query() filterResidenceDto: FilterResidenceDto): Promise<number> {
    return this.residenceService.getCount(filterResidenceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Residences' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Residence],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|host_id must be a positive number' +
      '|type_id must be a positive number|location must be a string|city_id must be a positive number' +
      '|price must be a positive number|activation status must be a boolean',
  })
  @Get()
  findAll(
    @Query() filterResidenceDto: FilterResidenceDto,
  ): Promise<Residence[]> {
    return this.residenceService.findAll(filterResidenceDto);
  }

  @ApiOperation({ summary: 'Get the Residence data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Residence associated with given id',
    type: Residence,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residence not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Residence> {
    return this.residenceService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Residence' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Residence',
    type: Residence,
  })
  @ApiResponse({
    status: 400,
    description:
      'host_id must be a positive number|title must be a string|type_id must be a positive number|location must be a string' +
      '|city_id must be a positive number|price must be a positive number|activation status must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residence not found|owner not found',
  })
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    return this.residenceService.update(
      +id,
      updateResidenceDto,
      req.hostInfo.host_id,
    );
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current Residence' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Residence',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residence not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string): Promise<void> {
    return this.residenceService.remove(+id, req.hostInfo.host_id);
  }
}

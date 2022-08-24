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
import { ResidenceService } from './residence.service';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
} from './dto';

@ApiTags('Residence')
@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
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
      'host_id must be a positive number|type_id must be a positive number|location must be a string|city_id must be a positive number' +
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

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Residence' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Residence',
    type: Residence,
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
    @Param('id') id: string,
    @Body() updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    return this.residenceService.update(+id, updateResidenceDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Residence' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Residence',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residence not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceService.remove(+id);
  }
}

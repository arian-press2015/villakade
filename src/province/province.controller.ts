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
import { ProvinceService } from './province.service';
import {
  Province,
  FilterProvinceDto,
  CreateProvinceDto,
  UpdateProvinceDto,
} from './dto';

@ApiTags('Province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Province' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Province',
    type: Province,
  })
  @ApiResponse({
    status: 400,
    description:
      'Province already exists|Name must be a string|Fa_name must be a string',
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
  create(@Body() createProvinceDto: CreateProvinceDto): Promise<Province> {
    return this.provinceService.create(createProvinceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Provinces' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Province],
  })
  @ApiResponse({
    status: 400,
    description: 'Name must be a string|Fa_name must be a string',
  })
  @Get()
  findAll(@Query() filterProvinceDto: FilterProvinceDto): Promise<Province[]> {
    return this.provinceService.findAll(filterProvinceDto);
  }

  @ApiOperation({ summary: 'Get the Province data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Province associated with given id',
    type: Province,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Province found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Province> {
    return this.provinceService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Province' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Province',
    type: Province,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Province found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Province' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Province',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Province found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.provinceService.remove(+id);
  }
}

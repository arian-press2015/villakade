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
  HttpException,
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
import { OwnerJwtGuard } from '../auth/guard';

@ApiTags('Province')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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
      'province already exists|name must be a string|name is required|fa_name must be a string|fa_name is required',
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
    throw new HttpException('hi', 400);
    return this.provinceService.create(createProvinceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Provinces' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'name must be a string|fa_name must be a string',
  })
  @Get('count')
  count(@Query() filterProvinceDto: FilterProvinceDto): Promise<number> {
    return this.provinceService.getCount(filterProvinceDto);
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
    description: 'name must be a string|fa_name must be a string',
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
    description: 'province not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Province> {
    return this.provinceService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
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
    description: 'province not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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
    description: 'province not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.provinceService.remove(+id);
  }
}

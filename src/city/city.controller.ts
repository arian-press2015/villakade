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
import { OwnerJwtGuard } from '../auth/guard';
import { CityService } from './city.service';
import { City, FilterCityDto, CreateCityDto, UpdateCityDto } from './dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new City' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new City',
    type: City,
  })
  @ApiResponse({
    status: 400,
    description:
      'city already exists|name is required|fa_name is required|name must be a string|fa_name must be a string' +
      '|province is required|province must be a positive number',
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
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.create(createCityDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Cities' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Cities',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'name must be a string|fa_name must be a string',
  })
  @Get('count')
  count(@Query() filterCityDto: FilterCityDto): Promise<number> {
    return this.cityService.getCount(filterCityDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Cities' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Cities',
    type: [City],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|name must be a string|fa_name must be a string',
  })
  @Get()
  findAll(@Query() filterCityDto: FilterCityDto): Promise<City[]> {
    return this.cityService.findAll(filterCityDto);
  }

  @ApiOperation({ summary: 'Get the City data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the City associated with given id',
    type: City,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'city not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<City> {
    return this.cityService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current City' })
  @ApiResponse({
    status: 200,
    description: 'Updates current City',
    type: City,
  })
  @ApiResponse({
    status: 400,
    description:
      'province must be a positive number|name must be a string|fa_name must be a string',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'city not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.cityService.update(+id, updateCityDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current City' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current City',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'city not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cityService.remove(+id);
  }
}

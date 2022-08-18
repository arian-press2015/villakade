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
import { CityService } from './city.service';
import { City, FilterCityDto, CreateCityDto, UpdateCityDto } from './dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // @ApiBearerAuth()
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
      'City already exists|Name must be a string|Fa_name must be a string',
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
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.create(createCityDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Citys' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [City],
  })
  @ApiResponse({
    status: 400,
    description: 'Name must be a string|Fa_name must be a string',
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
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No City found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<City> {
    return this.cityService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current City' })
  @ApiResponse({
    status: 200,
    description: 'Updates current City',
    type: City,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No City found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.cityService.update(+id, updateCityDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current City' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current City',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No City found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.cityService.remove(+id);
  }
}

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
import { ResidenceAirConditioningService } from './residenceAirConditioning.service';
import {
  ResidenceAirConditioning,
  FilterResidenceAirConditioningDto,
  CreateResidenceAirConditioningDto,
  UpdateResidenceAirConditioningDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceAirConditioning')
@Controller('residenceAirConditioning')
export class ResidenceAirConditioningController {
  constructor(
    private readonly residenceAirConditioningService: ResidenceAirConditioningService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceAirConditioning' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceAirConditioning',
    type: ResidenceAirConditioning,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|radiator is required|radiator must be a boolean' +
      '|wood_heater is required|wood_heater must be a boolean|fireplace is required|fireplace must be a boolean|korsi is required' +
      '|korsi must be a boolean|oil_heater is required|oil_heater must be a boolean|fancoil is required|fancoil must be a boolean' +
      '|electric_heater is required|electric_heater must be a boolean|air_conditioner is required|air_conditioner must be a boolean' +
      '|water_cooler is required|water_cooler must be a boolean|split is required|split must be a boolean|ceiling_fan is required' +
      '|ceiling_fan must be a boolean|standing_fan is required|standing_fan must be a boolean',
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
    @Body()
    createResidenceAirConditioningDto: CreateResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning> {
    return this.residenceAirConditioningService.create(
      createResidenceAirConditioningDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceAirConditionings' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query()
    filterResidenceAirConditioningDto: FilterResidenceAirConditioningDto,
  ): Promise<number> {
    return this.residenceAirConditioningService.getCount(
      filterResidenceAirConditioningDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceAirConditionings' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceAirConditioning],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query()
    filterResidenceAirConditioningDto: FilterResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning[]> {
    return this.residenceAirConditioningService.findAll(
      filterResidenceAirConditioningDto,
    );
  }

  @ApiOperation({ summary: 'Get the ResidenceAirConditioning data' })
  @ApiResponse({
    status: 200,
    description:
      'Returns the ResidenceAirConditioning associated with given id',
    type: ResidenceAirConditioning,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceairconditioning not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceAirConditioning> {
    return this.residenceAirConditioningService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceAirConditioning' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceAirConditioning',
    type: ResidenceAirConditioning,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|radiator is required|radiator must be a boolean' +
      '|wood_heater is required|wood_heater must be a boolean|fireplace is required|fireplace must be a boolean|korsi is required' +
      '|korsi must be a boolean|oil_heater is required|oil_heater must be a boolean|fancoil is required|fancoil must be a boolean' +
      '|electric_heater is required|electric_heater must be a boolean|air_conditioner is required|air_conditioner must be a boolean' +
      '|water_cooler is required|water_cooler must be a boolean|split is required|split must be a boolean|ceiling_fan is required' +
      '|ceiling_fan must be a boolean|standing_fan is required|standing_fan must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceairconditioning not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateResidenceAirConditioningDto: UpdateResidenceAirConditioningDto,
  ): Promise<ResidenceAirConditioning> {
    return this.residenceAirConditioningService.update(
      +id,
      updateResidenceAirConditioningDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceAirConditioning' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceAirConditioning',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceairconditioning not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceAirConditioningService.remove(+id);
  }
}

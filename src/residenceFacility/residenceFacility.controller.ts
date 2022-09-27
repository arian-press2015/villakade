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
import { ResidenceFacilityService } from './residenceFacility.service';
import {
  ResidenceFacility,
  FilterResidenceFacilityDto,
  CreateResidenceFacilityDto,
  UpdateResidenceFacilityDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceFacility')
@Controller('residenceFacility')
export class ResidenceFacilityController {
  constructor(
    private readonly residenceFacilityService: ResidenceFacilityService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceFacility' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceFacility',
    type: ResidenceFacility,
  })
  @ApiResponse({
    status: 400,
    description:
      'residencefacility already exists|residence_id must be a string|residence_id is required|furniture is required|furniture must be a boolean' +
      '|vacuum_cleaner is required|vacuum_cleaner must be a boolean|washing_machine is required|washing_machine must be a boolean' +
      '|washing_powder is required|washing_powder must be a boolean|dishwashing_machine is required|dishwashing_machine must be a boolean' +
      '|wifi is required|wifi must be a boolean|hairdryer is required|hairdryer must be a boolean|elevator is required|iron is required' +
      '|iron must be a boolean|telephone is required|telephone must be a boolean|first_aid_kit is required|first_aid_kit must be a boolean' +
      '|security_camera is required|security_camera must be a boolean',
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
    @Body() createResidenceFacilityDto: CreateResidenceFacilityDto,
  ): Promise<ResidenceFacility> {
    return this.residenceFacilityService.create(createResidenceFacilityDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceFacilitys' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceFacilityDto: FilterResidenceFacilityDto,
  ): Promise<number> {
    return this.residenceFacilityService.getCount(filterResidenceFacilityDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceFacilitys' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceFacility],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceFacilityDto: FilterResidenceFacilityDto,
  ): Promise<ResidenceFacility[]> {
    return this.residenceFacilityService.findAll(filterResidenceFacilityDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceFacility data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceFacility associated with given id',
    type: ResidenceFacility,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residencefacility not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceFacility> {
    return this.residenceFacilityService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceFacility' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceFacility',
    type: ResidenceFacility,
  })
  @ApiResponse({
    status: 400,
    description:
      'residencefacility already exists|residence_id must be a string|residence_id is required|furniture is required|furniture must be a boolean' +
      '|vacuum_cleaner is required|vacuum_cleaner must be a boolean|washing_machine is required|washing_machine must be a boolean' +
      '|washing_powder is required|washing_powder must be a boolean|dishwashing_machine is required|dishwashing_machine must be a boolean' +
      '|wifi is required|wifi must be a boolean|hairdryer is required|hairdryer must be a boolean|elevator is required|iron is required' +
      '|iron must be a boolean|telephone is required|telephone must be a boolean|first_aid_kit is required|first_aid_kit must be a boolean' +
      '|security_camera is required|security_camera must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencefacility not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceFacilityDto: UpdateResidenceFacilityDto,
  ): Promise<ResidenceFacility> {
    return this.residenceFacilityService.update(
      +id,
      updateResidenceFacilityDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceFacility' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceFacility',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencefacility not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceFacilityService.remove(+id);
  }
}

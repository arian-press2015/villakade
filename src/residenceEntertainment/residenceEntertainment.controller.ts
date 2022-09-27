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
import { ResidenceEntertainmentService } from './residenceEntertainment.service';
import {
  ResidenceEntertainment,
  FilterResidenceEntertainmentDto,
  CreateResidenceEntertainmentDto,
  UpdateResidenceEntertainmentDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceEntertainment')
@Controller('residenceEntertainment')
export class ResidenceEntertainmentController {
  constructor(
    private readonly residenceEntertainmentService: ResidenceEntertainmentService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceEntertainment' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceEntertainment',
    type: ResidenceEntertainment,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|television is required|television must be a boolean' +
      '|receiver is required|receiver must be a boolean|audio_system is required|audio_system must be a boolean|swing is required|swing must be a boolean' +
      '|ping_pong is required|ping_pong must be a boolean|foosball is required|foosball must be a boolean|game_console is required' +
      '|game_console must be a boolean|pool_table is required|game_board is required|game_board must be a boolean|treadmill is required' +
      '|treadmill must be a boolean|bicycle is required|bicycle must be a boolean|beach_motor is required|beach_motor must be a boolean',
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
    @Body() createResidenceEntertainmentDto: CreateResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment> {
    return this.residenceEntertainmentService.create(
      createResidenceEntertainmentDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceEntertainments' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceEntertainmentDto: FilterResidenceEntertainmentDto,
  ): Promise<number> {
    return this.residenceEntertainmentService.getCount(
      filterResidenceEntertainmentDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceEntertainments' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceEntertainment],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceEntertainmentDto: FilterResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment[]> {
    return this.residenceEntertainmentService.findAll(
      filterResidenceEntertainmentDto,
    );
  }

  @ApiOperation({ summary: 'Get the ResidenceEntertainment data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceEntertainment associated with given id',
    type: ResidenceEntertainment,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceentertainment not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceEntertainment> {
    return this.residenceEntertainmentService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceEntertainment' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceEntertainment',
    type: ResidenceEntertainment,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|television is required|television must be a boolean' +
      '|receiver is required|receiver must be a boolean|audio_system is required|audio_system must be a boolean|swing is required|swing must be a boolean' +
      '|ping_pong is required|ping_pong must be a boolean|foosball is required|foosball must be a boolean|game_console is required' +
      '|game_console must be a boolean|pool_table is required|game_board is required|game_board must be a boolean|treadmill is required' +
      '|treadmill must be a boolean|bicycle is required|bicycle must be a boolean|beach_motor is required|beach_motor must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceentertainment not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceEntertainmentDto: UpdateResidenceEntertainmentDto,
  ): Promise<ResidenceEntertainment> {
    return this.residenceEntertainmentService.update(
      +id,
      updateResidenceEntertainmentDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceEntertainment' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceEntertainment',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceentertainment not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceEntertainmentService.remove(+id);
  }
}

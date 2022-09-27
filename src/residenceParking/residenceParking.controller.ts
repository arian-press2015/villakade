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
import { ResidenceParkingService } from './residenceParking.service';
import {
  ResidenceParking,
  FilterResidenceParkingDto,
  CreateResidenceParkingDto,
  UpdateResidenceParkingDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceParking')
@Controller('residenceParking')
export class ResidenceParkingController {
  constructor(
    private readonly residenceParkingService: ResidenceParkingService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceParking' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceParking',
    type: ResidenceParking,
  })
  @ApiResponse({
    status: 400,
    description:
      'roof is required|roof must be a boolean|unroofed is required|unroofed must be a boolean|public is required|public must be a boolean' +
      '|free_space is required|free_space must be a boolean',
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
    @Body() createResidenceParkingDto: CreateResidenceParkingDto,
  ): Promise<ResidenceParking> {
    return this.residenceParkingService.create(createResidenceParkingDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceParkings' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceParkingDto: FilterResidenceParkingDto,
  ): Promise<number> {
    return this.residenceParkingService.getCount(filterResidenceParkingDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceParkings' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceParking],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceParkingDto: FilterResidenceParkingDto,
  ): Promise<ResidenceParking[]> {
    return this.residenceParkingService.findAll(filterResidenceParkingDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceParking data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceParking associated with given id',
    type: ResidenceParking,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceparking not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceParking> {
    return this.residenceParkingService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceParking' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceParking',
    type: ResidenceParking,
  })
  @ApiResponse({
    status: 400,
    description:
      'roof is required|roof must be a boolean|unroofed is required|unroofed must be a boolean|public is required|public must be a boolean' +
      '|free_space is required|free_space must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceparking not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceParkingDto: UpdateResidenceParkingDto,
  ): Promise<ResidenceParking> {
    return this.residenceParkingService.update(+id, updateResidenceParkingDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceParking' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceParking',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceparking not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceParkingService.remove(+id);
  }
}

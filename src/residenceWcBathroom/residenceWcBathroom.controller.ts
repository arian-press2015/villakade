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
import { ResidenceWcBathroomService } from './residenceWcBathroom.service';
import {
  ResidenceWcBathroom,
  FilterResidenceWcBathroomDto,
  CreateResidenceWcBathroomDto,
  UpdateResidenceWcBathroomDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceWcBathroom')
@Controller('residenceWcBathroom')
export class ResidenceWcBathroomController {
  constructor(
    private readonly residenceWcBathroomService: ResidenceWcBathroomService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceWcBathroom' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceWcBathroom',
    type: ResidenceWcBathroom,
  })
  @ApiResponse({
    status: 400,
    description:
      'residence_id must be a number|residence_id is required|location is required|location must be a string|local_wc is required|local_wc must be a boolean|fix_wc is required' +
      '|fix_wc must be a boolean|portable_wc is required|portable_wc must be a boolean|shower is required|shower must be a boolean|jacuzzi is required|jacuzzi must be a boolean' +
      '|bathtub is required|bathtub must be a boolean|soap is required|soap must be a boolean|shampoo is required|shampoo must be a boolean|shared_wc_bathroom is required' +
      '|shared_wc_bathroom must be a boolean',
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
    @Body() createResidenceWcBathroomDto: CreateResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom> {
    return this.residenceWcBathroomService.create(createResidenceWcBathroomDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceWcBathrooms' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceWcBathroomDto: FilterResidenceWcBathroomDto,
  ): Promise<number> {
    return this.residenceWcBathroomService.getCount(
      filterResidenceWcBathroomDto,
    );
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceWcBathrooms' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceWcBathroom],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceWcBathroomDto: FilterResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom[]> {
    return this.residenceWcBathroomService.findAll(
      filterResidenceWcBathroomDto,
    );
  }

  @ApiOperation({ summary: 'Get the ResidenceWcBathroom data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceWcBathroom associated with given id',
    type: ResidenceWcBathroom,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residencewcbathroom not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceWcBathroom> {
    return this.residenceWcBathroomService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceWcBathroom' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceWcBathroom',
    type: ResidenceWcBathroom,
  })
  @ApiResponse({
    status: 400,
    description:
      'residence_id must be a number|residence_id is required|location is required|location must be a string|local_wc is required|local_wc must be a boolean|fix_wc is required' +
      '|fix_wc must be a boolean|portable_wc is required|portable_wc must be a boolean|shower is required|shower must be a boolean|jacuzzi is required|jacuzzi must be a boolean' +
      '|bathtub is required|bathtub must be a boolean|soap is required|soap must be a boolean|shampoo is required|shampoo must be a boolean|shared_wc_bathroom is required' +
      '|shared_wc_bathroom must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencewcbathroom not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceWcBathroomDto: UpdateResidenceWcBathroomDto,
  ): Promise<ResidenceWcBathroom> {
    return this.residenceWcBathroomService.update(
      +id,
      updateResidenceWcBathroomDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceWcBathroom' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceWcBathroom',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencewcbathroom not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceWcBathroomService.remove(+id);
  }
}

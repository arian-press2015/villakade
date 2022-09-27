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
import { ResidenceCookingService } from './residenceCooking.service';
import {
  ResidenceCooking,
  FilterResidenceCookingDto,
  CreateResidenceCookingDto,
  UpdateResidenceCookingDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceCooking')
@Controller('residenceCooking')
export class ResidenceCookingController {
  constructor(
    private readonly residenceCookingService: ResidenceCookingService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceCooking' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceCooking',
    type: ResidenceCooking,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|fridge is required|fridge must be a boolean' +
      '|microwave is required|microwave must be a boolean|pan is required|pan must be a boolean|pot is required|pot must be a boolean' +
      '|grill is required|grill must be a boolean|skewer is required|skewer must be a boolean|oven is required|oven must be a boolean' +
      '|lighter is required|lighter must be a boolean',
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
    @Body() createResidenceCookingDto: CreateResidenceCookingDto,
  ): Promise<ResidenceCooking> {
    return this.residenceCookingService.create(createResidenceCookingDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceCookings' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceCookingDto: FilterResidenceCookingDto,
  ): Promise<number> {
    return this.residenceCookingService.getCount(filterResidenceCookingDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceCookings' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceCooking],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceCookingDto: FilterResidenceCookingDto,
  ): Promise<ResidenceCooking[]> {
    return this.residenceCookingService.findAll(filterResidenceCookingDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceCooking data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceCooking associated with given id',
    type: ResidenceCooking,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residencecooking not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceCooking> {
    return this.residenceCookingService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceCooking' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceCooking',
    type: ResidenceCooking,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|fridge is required|fridge must be a boolean' +
      '|microwave is required|microwave must be a boolean|pan is required|pan must be a boolean|pot is required|pot must be a boolean' +
      '|grill is required|grill must be a boolean|skewer is required|skewer must be a boolean|oven is required|oven must be a boolean' +
      '|lighter is required|lighter must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencecooking not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceCookingDto: UpdateResidenceCookingDto,
  ): Promise<ResidenceCooking> {
    return this.residenceCookingService.update(+id, updateResidenceCookingDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceCooking' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceCooking',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencecooking not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceCookingService.remove(+id);
  }
}

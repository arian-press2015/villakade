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
import { ResidencePriceService } from './residencePrice.service';
import {
  ResidencePrice,
  FilterResidencePriceDto,
  CreateResidencePriceDto,
  UpdateResidencePriceDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidencePrice')
@Controller('residencePrice')
export class ResidencePriceController {
  constructor(private readonly residencePriceService: ResidencePriceService) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidencePrice' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidencePrice',
    type: ResidencePrice,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceprice already exists|residence_id must be a string|residence_id is required|weekday_price is required|weekday_price must be a positive number' +
      '|weekend_price is required|weekend_price must be a positive number|peak_price is required|peak_price must be a positive number|extra_guest_weekday is required' +
      '|extra_guest_weekday must be a positive number|extra_guest_weekend is required|extra_guest_weekend must be a positive number|extra_guest_peak is required' +
      '|extra_guest_peak must be a positive number',
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
    @Body() createResidencePriceDto: CreateResidencePriceDto,
  ): Promise<ResidencePrice> {
    return this.residencePriceService.create(createResidencePriceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidencePrices' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidencePriceDto: FilterResidencePriceDto,
  ): Promise<number> {
    return this.residencePriceService.getCount(filterResidencePriceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidencePrices' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidencePrice],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidencePriceDto: FilterResidencePriceDto,
  ): Promise<ResidencePrice[]> {
    return this.residencePriceService.findAll(filterResidencePriceDto);
  }

  @ApiOperation({ summary: 'Get the ResidencePrice data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidencePrice associated with given id',
    type: ResidencePrice,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceprice not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidencePrice> {
    return this.residencePriceService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidencePrice' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidencePrice',
    type: ResidencePrice,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceprice already exists|residence_id must be a string|residence_id is required|weekday_price is required|weekday_price must be a positive number' +
      '|weekend_price is required|weekend_price must be a positive number|peak_price is required|peak_price must be a positive number|extra_guest_weekday is required' +
      '|extra_guest_weekday must be a positive number|extra_guest_weekend is required|extra_guest_weekend must be a positive number|extra_guest_peak is required' +
      '|extra_guest_peak must be a positive number',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceprice not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidencePriceDto: UpdateResidencePriceDto,
  ): Promise<ResidencePrice> {
    return this.residencePriceService.update(+id, updateResidencePriceDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidencePrice' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidencePrice',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceprice not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residencePriceService.remove(+id);
  }
}

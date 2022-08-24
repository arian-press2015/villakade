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
import { ResidenceAttributeService } from './residenceAttribute.service';
import {
  ResidenceAttribute,
  FilterResidenceAttributeDto,
  CreateResidenceAttributeDto,
  UpdateResidenceAttributeDto,
} from './dto';

@ApiTags('ResidenceAttribute')
@Controller('residenceAttribute')
export class ResidenceAttributeController {
  constructor(
    private readonly residenceAttributeService: ResidenceAttributeService,
  ) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceAttribute' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceAttribute',
    type: ResidenceAttribute,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceattribute already exists|residence_id is required|residence_id must be a positive number|residence_size must be a positive number' +
      '|residence_size is required|residence_yard_size is required|residence_yard_size must be a positive number|bedroom_count is required' +
      '|bedroom_count must be a positive number|capacity is required|capacity must be a positive number|in_time is required|in_time must be a string' +
      '|out_time is required|out_time must be a string|pet must be a boolean|instant_delivery must be a boolean|dishes must be a boolean' +
      '|dining_table must be a boolean|microwave must be a boolean|fridge must be a boolean|water must be a boolean|electricity must be a boolean' +
      '|gas must be a boolean|tv must be a boolean|elevator must be a boolean|local_wc must be a boolean|wc must be a boolean|pool_table must be a boolean' +
      '|ping_pong_table must be a boolean|pool must be a boolean',
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
    @Body() createResidenceAttributeDto: CreateResidenceAttributeDto,
  ): Promise<ResidenceAttribute> {
    return this.residenceAttributeService.create(createResidenceAttributeDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceAttributes' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceattribute already exists|residence_id must be a positive number|residence_size must be a positive number|residence_yard_size must be a positive number' +
      '|bedroom_count must be a positive number|capacity must be a positive number|in_time must be a string|out_time must be a string|pet must be a boolean' +
      '|instant_delivery must be a boolean|dishes must be a boolean|dining_table must be a boolean|microwave must be a boolean|fridge must be a boolean' +
      '|water must be a boolean|electricity must be a boolean|gas must be a boolean|tv must be a boolean|elevator must be a boolean|local_wc must be a boolean' +
      '|wc must be a boolean|pool_table must be a boolean|ping_pong_table must be a boolean|pool must be a boolean',
  })
  @Get('count')
  count(
    @Query() filterResidenceAttributeDto: FilterResidenceAttributeDto,
  ): Promise<number> {
    return this.residenceAttributeService.getCount(filterResidenceAttributeDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceAttributes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceAttribute],
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceattribute already exists|residence_id must be a positive number|residence_size must be a positive number|residence_yard_size must be a positive number' +
      '|bedroom_count must be a positive number|capacity must be a positive number|in_time must be a string|out_time must be a string|pet must be a boolean' +
      '|instant_delivery must be a boolean|dishes must be a boolean|dining_table must be a boolean|microwave must be a boolean|fridge must be a boolean' +
      '|water must be a boolean|electricity must be a boolean|gas must be a boolean|tv must be a boolean|elevator must be a boolean|local_wc must be a boolean' +
      '|wc must be a boolean|pool_table must be a boolean|ping_pong_table must be a boolean|pool must be a boolean',
  })
  @Get()
  findAll(
    @Query() filterResidenceAttributeDto: FilterResidenceAttributeDto,
  ): Promise<ResidenceAttribute[]> {
    return this.residenceAttributeService.findAll(filterResidenceAttributeDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceAttribute data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceAttribute associated with given id',
    type: ResidenceAttribute,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceattribute not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceAttribute> {
    return this.residenceAttributeService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current ResidenceAttribute' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceAttribute',
    type: ResidenceAttribute,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceattribute not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceAttributeDto: UpdateResidenceAttributeDto,
  ): Promise<ResidenceAttribute> {
    return this.residenceAttributeService.update(
      +id,
      updateResidenceAttributeDto,
    );
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current ResidenceAttribute' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current ResidenceAttribute',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceattribute not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceAttributeService.remove(+id);
  }
}

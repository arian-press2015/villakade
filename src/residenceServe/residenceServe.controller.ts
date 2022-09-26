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
import { ResidenceServeService } from './residenceServe.service';
import {
  ResidenceServe,
  FilterResidenceServeDto,
  CreateResidenceServeDto,
  UpdateResidenceServeDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceServe')
@Controller('residenceServe')
export class ResidenceServeController {
  constructor(private readonly residenceServeService: ResidenceServeService) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceServe' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceServe',
    type: ResidenceServe,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|plate is required|plate must be a boolean' +
      '|fork_spoon is required|fork_spoon must be a boolean|knife is required|knife must be a boolean|bowl is required|bowl must be a boolean' +
      '|glass is required|glass must be a boolean|teapot is required|teapot must be a boolean|kettle is required|kettle must be a boolean' +
      '|samovar is required|samovar must be a boolean|tea_maker is required|tea_maker must be a boolean|salt_shaker is required' +
      '|salt_shaker must be a boolean|tablecloth is required|tablecloth must be a boolean|dining_table is required|dining_table must be a boolean' +
      '|child_chair is required|child_chair must be a boolean|tissue_paper is required|tissue_paper must be a boolean',
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
    @Body() createResidenceServeDto: CreateResidenceServeDto,
  ): Promise<ResidenceServe> {
    return this.residenceServeService.create(createResidenceServeDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceServes' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceServeDto: FilterResidenceServeDto,
  ): Promise<number> {
    return this.residenceServeService.getCount(filterResidenceServeDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceServes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceServe],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceServeDto: FilterResidenceServeDto,
  ): Promise<ResidenceServe[]> {
    return this.residenceServeService.findAll(filterResidenceServeDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceServe data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceServe associated with given id',
    type: ResidenceServe,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residencerule not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceServe> {
    return this.residenceServeService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceServe' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceServe',
    type: ResidenceServe,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceserve already exists|residence_id must be a string|residence_id is required|plate is required|plate must be a boolean' +
      '|fork_spoon is required|fork_spoon must be a boolean|knife is required|knife must be a boolean|bowl is required|bowl must be a boolean' +
      '|glass is required|glass must be a boolean|teapot is required|teapot must be a boolean|kettle is required|kettle must be a boolean' +
      '|samovar is required|samovar must be a boolean|tea_maker is required|tea_maker must be a boolean|salt_shaker is required' +
      '|salt_shaker must be a boolean|tablecloth is required|tablecloth must be a boolean|dining_table is required|dining_table must be a boolean' +
      '|child_chair is required|child_chair must be a boolean|tissue_paper is required|tissue_paper must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencerule not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceServeDto: UpdateResidenceServeDto,
  ): Promise<ResidenceServe> {
    return this.residenceServeService.update(+id, updateResidenceServeDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceServe' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceServe',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencerule not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceServeService.remove(+id);
  }
}

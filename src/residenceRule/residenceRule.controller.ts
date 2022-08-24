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
import { ResidenceRuleService } from './residenceRule.service';
import {
  ResidenceRule,
  FilterResidenceRuleDto,
  CreateResidenceRuleDto,
  UpdateResidenceRuleDto,
} from './dto';

@ApiTags('ResidenceRule')
@Controller('residenceRule')
export class ResidenceRuleController {
  constructor(private readonly residenceRuleService: ResidenceRuleService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceRule' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceRule',
    type: ResidenceRule,
  })
  @ApiResponse({
    status: 400,
    description:
      'residencerule already exists|residence_id must be a string|residence_id is required|rule_body must be a string|rule_body is required',
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
    @Body() createResidenceRuleDto: CreateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    return this.residenceRuleService.create(createResidenceRuleDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceRules' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceRuleDto: FilterResidenceRuleDto,
  ): Promise<number> {
    return this.residenceRuleService.getCount(filterResidenceRuleDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceRules' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceRule],
  })
  @Get()
  findAll(
    @Query() filterResidenceRuleDto: FilterResidenceRuleDto,
  ): Promise<ResidenceRule[]> {
    return this.residenceRuleService.findAll(filterResidenceRuleDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceRule data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceRule associated with given id',
    type: ResidenceRule,
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
  findOne(@Param('id') id: string): Promise<ResidenceRule> {
    return this.residenceRuleService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current ResidenceRule' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceRule',
    type: ResidenceRule,
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
    @Body() updateResidenceRuleDto: UpdateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    return this.residenceRuleService.update(+id, updateResidenceRuleDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current ResidenceRule' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current ResidenceRule',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residencerule not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceRuleService.remove(+id);
  }
}

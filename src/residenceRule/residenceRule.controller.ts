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
      'ResidenceRule already exists|Title must be a string|Fa_rule_body must be a string',
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No User found',
  })
  @Post()
  create(
    @Body() createResidenceRuleDto: CreateResidenceRuleDto,
  ): Promise<ResidenceRule> {
    return this.residenceRuleService.create(createResidenceRuleDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceRules' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceRule],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_rule_body must be a string',
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
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceRule found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceRule found|No User found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceRule found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceRuleService.remove(+id);
  }
}

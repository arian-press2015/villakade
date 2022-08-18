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
      'ResidenceAttribute already exists|residence_size must be a string|residence_yard_size must be a string',
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
    @Body() createResidenceAttributeDto: CreateResidenceAttributeDto,
  ): Promise<ResidenceAttribute> {
    return this.residenceAttributeService.create(createResidenceAttributeDto);
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
      'residence_size must be a string|residence_yard_size must be a string',
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
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceAttribute found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceAttribute found|No User found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No ResidenceAttribute found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceAttributeService.remove(+id);
  }
}

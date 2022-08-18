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
import { ResidenceService } from './residence.service';
import {
  Residence,
  FilterResidenceDto,
  CreateResidenceDto,
  UpdateResidenceDto,
} from './dto';

@ApiTags('Residence')
@Controller('residence')
export class ResidenceController {
  constructor(private readonly residenceService: ResidenceService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Residence' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Residence',
    type: Residence,
  })
  @ApiResponse({
    status: 400,
    description:
      'Residence already exists|Title must be a string|Fa_title must be a string',
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
  create(@Body() createResidenceDto: CreateResidenceDto): Promise<Residence> {
    return this.residenceService.create(createResidenceDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Residences' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Residence],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_title must be a string',
  })
  @Get()
  findAll(@Query() filterResidenceDto: FilterResidenceDto): Promise<Residence[]> {
    return this.residenceService.findAll(filterResidenceDto);
  }

  @ApiOperation({ summary: 'Get the Residence data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Residence associated with given id',
    type: Residence,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Residence found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Residence> {
    return this.residenceService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Residence' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Residence',
    type: Residence,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Residence found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    return this.residenceService.update(+id, updateResidenceDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Residence' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Residence',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Residence found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.residenceService.remove(+id);
  }
}

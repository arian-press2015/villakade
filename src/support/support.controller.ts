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
import { SupportService } from './support.service';
import {
  Support,
  FilterSupportDto,
  CreateSupportDto,
  UpdateSupportDto,
} from './dto';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Support' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Support',
    type: Support,
  })
  @ApiResponse({
    status: 400,
    description:
      'Support already exists|Title must be a string|Fa_full_name must be a string',
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
  create(@Body() createSupportDto: CreateSupportDto): Promise<Support> {
    return this.supportService.create(createSupportDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Supports' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Support],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_full_name must be a string',
  })
  @Get()
  findAll(@Query() filterSupportDto: FilterSupportDto): Promise<Support[]> {
    return this.supportService.findAll(filterSupportDto);
  }

  @ApiOperation({ summary: 'Get the Support data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Support associated with given id',
    type: Support,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Support found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Support> {
    return this.supportService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Support' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Support',
    type: Support,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Support found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupportDto: UpdateSupportDto,
  ): Promise<Support> {
    return this.supportService.update(+id, updateSupportDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Support' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Support',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Support found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.supportService.remove(+id);
  }
}

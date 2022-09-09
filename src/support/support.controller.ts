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
import { SupportService } from './support.service';
import {
  Support,
  FilterSupportDto,
  CreateSupportDto,
  UpdateSupportDto,
} from './dto';
import { OwnerJwtGuard } from '../auth/guard';

@ApiTags('Support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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
      'Support already exists|full_name is required|phone is required|phone must be a string|activation status is required|activation status must be a boolean',
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
  create(@Body() createSupportDto: CreateSupportDto): Promise<Support> {
    return this.supportService.create(createSupportDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Supports' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'full_name must be a string|phone must be a string|activation status must be a string',
  })
  @Get('count')
  count(@Query() filterSupportDto: FilterSupportDto): Promise<number> {
    return this.supportService.getCount(filterSupportDto);
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
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|full_name must be a string|phone must be a string|activation status must be a string',
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
    description:
      'id must be a positive number|full_name must be a string|phone must be a string|activation status must be a boolean',
  })
  @ApiResponse({
    status: 404,
    description: 'support not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Support> {
    return this.supportService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Support' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Support',
    type: Support,
  })
  @ApiResponse({
    status: 400,
    description:
      'title must be a string|phone must be a string|activation status must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'support not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupportDto: UpdateSupportDto,
  ): Promise<Support> {
    return this.supportService.update(+id, updateSupportDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current Support' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Support',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Support found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.supportService.remove(+id);
  }
}

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
import { HostService } from './host.service';
import { Host, FilterHostDto, CreateHostDto, UpdateHostDto } from './dto';

@ApiTags('Host')
@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Host' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Host',
    type: Host,
  })
  @ApiResponse({
    status: 400,
    description:
      'host already exists|first_name is required|first_name must be a string|last_name is required|last_name must be a string' +
      '|phone is required|phone must be a string|vip is required|vip must be a boolean|activation status is required|activation status must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'owner not found',
  })
  @Post()
  create(@Body() createHostDto: CreateHostDto): Promise<Host> {
    return this.hostService.create(createHostDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Hosts' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'first_name must be a string|last_name must be a string|phone must be a string|vip must be a boolean|activation status must be a boolean',
  })
  @Get('count')
  count(@Query() filterHostDto: FilterHostDto): Promise<number> {
    return this.hostService.getCount(filterHostDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Hosts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Host],
  })
  @ApiResponse({
    status: 400,
    description:
      'first_name must be a string|last_name must be a string|phone must be a string|vip must be a boolean|activation status must be a boolean',
  })
  @Get()
  findAll(@Query() filterHostDto: FilterHostDto): Promise<Host[]> {
    return this.hostService.findAll(filterHostDto);
  }

  @ApiOperation({ summary: 'Get the Host data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Host associated with given id',
    type: Host,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'host not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Host> {
    return this.hostService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Host' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Host',
    type: Host,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'host not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHostDto: UpdateHostDto,
  ): Promise<Host> {
    return this.hostService.update(+id, updateHostDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Host' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Host',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'host not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.hostService.remove(+id);
  }
}

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
      'Host already exists|Title must be a string|Fa_first_name must be a string',
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
  @ApiOperation({ summary: 'Get all of the Hosts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Host],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_first_name must be a string',
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
    description: 'No Host found',
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
    description: 'No Host found|owner not found',
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
    description: 'No Host found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.hostService.remove(+id);
  }
}

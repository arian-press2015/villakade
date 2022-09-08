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
  Request,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HostService } from './host.service';
import {
  Host,
  FilterHostDto,
  CreateHostDto,
  UpdateHostDto,
  UpdateMyHostDto,
  HostLoginRequest,
  HostLoginResponse,
} from './dto';
import { HostJwtGuard, HostLocalGuard, OwnerJwtGuard } from '../auth/guard';
import { AuthService } from '../auth/auth.service';

@ApiTags('Host')
@Controller('host')
export class HostController {
  constructor(
    private readonly hostService: HostService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(HostLocalGuard)
  @Post('login')
  @ApiOperation({ summary: 'login Host' })
  @ApiBody({
    description: 'Required body fields',
    type: HostLoginRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns auth_token for the Owner',
    type: HostLoginResponse,
  })
  async login(@Request() req): Promise<HostLoginResponse> {
    return this.authService.hostLogin(req.hostInfo);
  }

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
  create(@Body() createHostDto: CreateHostDto, @Request() req): Promise<Host> {
    return this.hostService.create(createHostDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Get current Host data' })
  @ApiResponse({
    status: 200,
    description: 'Returns current Host associated with given id',
    type: Host,
  })
  @Get('me')
  findMe(@Request() req): Promise<Host> {
    console.log('controller', req.hostInfo);
    return this.hostService.findOne(req.hostInfo.host_id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update my Host' })
  @ApiResponse({
    status: 200,
    description: 'Updates my Host',
    type: Host,
  })
  @Patch('me')
  updateMe(
    @Request() req,
    @Body() updateMyHostDto: UpdateMyHostDto,
  ): Promise<Host> {
    return this.hostService.update(req.hostInfo.host_id, updateMyHostDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Host' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Host',
    type: Host,
  })
  @ApiResponse({
    status: 400,
    description:
      'first_name must be a string|last_name must be a string|phone must be a string|vip must be a boolean|activation status must be a boolean',
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

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current Host' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Host',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'host not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.hostService.remove(+id);
  }
}

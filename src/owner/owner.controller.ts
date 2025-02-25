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
import { OwnerService } from './owner.service';
import {
  Owner,
  FilterOwnerDto,
  CreateOwnerDto,
  UpdateOwnerDto,
  OwnerLoginRequest,
  OwnerLoginResponse,
} from './dto';
import { OwnerLocalGuard, OwnerJwtGuard } from '../auth/guard';
import { AuthService } from '../auth/auth.service';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(
    private readonly ownerService: OwnerService,
    private authService: AuthService,
  ) {}

  @UseGuards(OwnerLocalGuard)
  @Post('login')
  @ApiOperation({ summary: 'login Owner' })
  @ApiBody({
    description: 'Required body fields',
    type: OwnerLoginRequest,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns auth_token for the Owner',
    type: OwnerLoginResponse,
  })
  async login(@Request() req): Promise<OwnerLoginResponse> {
    return this.authService.ownerLogin(req.owner);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Owner' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Owner',
    type: Owner,
  })
  @ApiResponse({
    status: 400,
    description:
      'owner already exists|first_name is required|first_name must be a string|last_name is required|last_name must be a string|phone is required' +
      '|phone must be a string|username is required|username must be a string|password is required|password must be a string' +
      '|role_id is required|role_id must be a positive number',
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
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.create(createOwnerDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Owners' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'first_name is required|last_name must be a string|phone is required|username must be a string|role_id is required',
  })
  @Get('count')
  count(@Query() filterOwnerDto: FilterOwnerDto): Promise<number> {
    return this.ownerService.getCount(filterOwnerDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Owners' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Owner],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|first_name is required|last_name must be a string' +
      '|phone is required|username must be a string|role_id is required',
  })
  @Get()
  findAll(@Query() filterOwnerDto: FilterOwnerDto): Promise<Owner[]> {
    return this.ownerService.findAll(filterOwnerDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Get the Owner data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Owner associated with given id',
    type: Owner,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'owner not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Owner> {
    return this.ownerService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Owner' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Owner',
    type: Owner,
  })
  @ApiResponse({
    status: 400,
    description:
      'first_name must be a string|last_name must be a string|phone must be a string|username must be a string' +
      '|password must be a string|role_id must be a positive number',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'owner not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current Owner' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Owner',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'owner not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ownerService.remove(+id);
  }
}

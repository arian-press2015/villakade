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
import { PermissionService } from './permission.service';
import {
  Permission,
  FilterPermissionDto,
  CreatePermissionDto,
  UpdatePermissionDto,
} from './dto';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Permission' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Permission',
    type: Permission,
  })
  @ApiResponse({
    status: 400,
    description:
      'permission already exists|title must be a string|title is required|fa_title must be a string|fa_title is required',
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
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Permissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
  })
  @Get('count')
  count(@Query() filterPermissionDto: FilterPermissionDto): Promise<number> {
    return this.permissionService.getCount(filterPermissionDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Permissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Permission],
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
  })
  @Get()
  findAll(
    @Query() filterPermissionDto: FilterPermissionDto,
  ): Promise<Permission[]> {
    return this.permissionService.findAll(filterPermissionDto);
  }

  @ApiOperation({ summary: 'Get the Permission data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Permission associated with given id',
    type: Permission,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'permission not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Permission' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Permission',
    type: Permission,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'permission not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Permission' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Permission',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'permission not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.permissionService.remove(+id);
  }
}

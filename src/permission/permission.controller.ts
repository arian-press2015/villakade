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
      'Permission already exists|Title must be a string|Fa_title must be a string',
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
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
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
    description: 'Title must be a string|Fa_title must be a string',
  })
  @Get()
  findAll(@Query() filterPermissionDto: FilterPermissionDto): Promise<Permission[]> {
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
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Permission found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Permission found|No User found',
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
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Permission found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.permissionService.remove(+id);
  }
}

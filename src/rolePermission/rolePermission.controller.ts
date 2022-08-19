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
import { RolePermissionService } from './rolePermission.service';
import {
  RolePermission,
  FilterRolePermissionDto,
  CreateRolePermissionDto,
  UpdateRolePermissionDto,
} from './dto';

@ApiTags('RolePermission')
@Controller('rolePermission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new RolePermission' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new RolePermission',
    type: RolePermission,
  })
  @ApiResponse({
    status: 400,
    description:
      'RolePermission already exists|role_id must be a string|permission_id must be a string',
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
    @Body() createRolePermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermission> {
    return this.rolePermissionService.create(createRolePermissionDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the RolePermissions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [RolePermission],
  })
  @ApiResponse({
    status: 400,
    description: 'role_id must be a string|permission_id must be a string',
  })
  @Get()
  findAll(
    @Query() filterRolePermissionDto: FilterRolePermissionDto,
  ): Promise<RolePermission[]> {
    return this.rolePermissionService.findAll(filterRolePermissionDto);
  }

  @ApiOperation({ summary: 'Get the RolePermission data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the RolePermission associated with given id',
    type: RolePermission,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No RolePermission found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RolePermission> {
    return this.rolePermissionService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current RolePermission' })
  @ApiResponse({
    status: 200,
    description: 'Updates current RolePermission',
    type: RolePermission,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No RolePermission found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ): Promise<RolePermission> {
    return this.rolePermissionService.update(+id, updateRolePermissionDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current RolePermission' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current RolePermission',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No RolePermission found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.rolePermissionService.remove(+id);
  }
}

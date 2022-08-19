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
import { RoleService } from './role.service';
import {
  Role,
  FilterRoleDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Role' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Role',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description:
      'Role already exists|Title must be a string|Fa_title must be a string',
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
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Roles' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Role],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_title must be a string',
  })
  @Get()
  findAll(@Query() filterRoleDto: FilterRoleDto): Promise<Role[]> {
    return this.roleService.findAll(filterRoleDto);
  }

  @ApiOperation({ summary: 'Get the Role data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Role associated with given id',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Role found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Role' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Role',
    type: Role,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Role found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(+id, updateRoleDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Role' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Role',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Role found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.roleService.remove(+id);
  }
}

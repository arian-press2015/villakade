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
import { OwnerService } from './owner.service';
import { Owner, FilterOwnerDto, CreateOwnerDto, UpdateOwnerDto } from './dto';

@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  // @ApiBearerAuth()
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
      'Owner already exists|Title must be a string|Fa_first_name must be a string',
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

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Owners' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Owner],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_first_name must be a string',
  })
  @Get()
  findAll(@Query() filterOwnerDto: FilterOwnerDto): Promise<Owner[]> {
    return this.ownerService.findAll(filterOwnerDto);
  }

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
    description: 'No Owner found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Owner> {
    return this.ownerService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Owner' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Owner',
    type: Owner,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Owner found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Owner' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Owner',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Owner found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.ownerService.remove(+id);
  }
}

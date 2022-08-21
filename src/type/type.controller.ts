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
import { TypeService } from './type.service';
import { Type, FilterTypeDto, CreateTypeDto, UpdateTypeDto } from './dto';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Type' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Type',
    type: Type,
  })
  @ApiResponse({
    status: 400,
    description:
      'type already exists|title is required|title must be a string|fa_title is required|fa_title must be a string',
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
  create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typeService.create(createTypeDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Types' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Type],
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
  })
  @Get()
  findAll(@Query() filterTypeDto: FilterTypeDto): Promise<Type[]> {
    return this.typeService.findAll(filterTypeDto);
  }

  @ApiOperation({ summary: 'Get the Type data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Type associated with given id',
    type: Type,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'type not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Type> {
    return this.typeService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Type' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Type',
    type: Type,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'type not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeDto: UpdateTypeDto,
  ): Promise<Type> {
    return this.typeService.update(+id, updateTypeDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Type' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Type',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'type not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.typeService.remove(+id);
  }
}

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
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TypeService } from './type.service';
import { Type, FilterTypeDto, CreateTypeDto, UpdateTypeDto } from './dto';
import { OwnerJwtGuard } from '../auth/guard';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
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
  @ApiOperation({ summary: 'Get count of the Types' })
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
  count(@Query() filterTypeDto: FilterTypeDto): Promise<number> {
    return this.typeService.getCount(filterTypeDto);
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

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Type' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Type',
    type: Type,
  })
  @ApiResponse({
    status: 400,
    description: 'title must be a string|fa_title must be a string',
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

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current Type' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Type',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'type not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typeService.remove(+id);
  }
}

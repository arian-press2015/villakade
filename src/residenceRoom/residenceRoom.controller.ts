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
import { ResidenceRoomService } from './residenceRoom.service';
import {
  ResidenceRoom,
  FilterResidenceRoomDto,
  CreateResidenceRoomDto,
  UpdateResidenceRoomDto,
} from './dto';
import { HostJwtGuard } from '../auth/guard';

@ApiTags('ResidenceRoom')
@Controller('residenceRoom')
export class ResidenceRoomController {
  constructor(private readonly residenceRoomService: ResidenceRoomService) {}

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ResidenceRoom' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ResidenceRoom',
    type: ResidenceRoom,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceroom already exists|residence_id must be a string|residence_id is required|count is required|count must be a number|wall_closet is required' +
      '|wall_closet must be a boolean|drawer is required|drawer must be a boolean|hanger is required|hanger must be a boolean|double_bed is required' +
      '|double_bed must be a boolean|single_bed is required|single_bed must be a boolean|carpet is required|carpet must be a boolean' +
      '|heating_system is required|heating_system must be a boolean|cooling_system is required|cooling_system must be a boolean',
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
    @Body() createResidenceRoomDto: CreateResidenceRoomDto,
  ): Promise<ResidenceRoom> {
    return this.residenceRoomService.create(createResidenceRoomDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ResidenceRooms' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @Get('count')
  count(
    @Query() filterResidenceRoomDto: FilterResidenceRoomDto,
  ): Promise<number> {
    return this.residenceRoomService.getCount(filterResidenceRoomDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ResidenceRooms' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [ResidenceRoom],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string',
  })
  @Get()
  findAll(
    @Query() filterResidenceRoomDto: FilterResidenceRoomDto,
  ): Promise<ResidenceRoom[]> {
    return this.residenceRoomService.findAll(filterResidenceRoomDto);
  }

  @ApiOperation({ summary: 'Get the ResidenceRoom data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ResidenceRoom associated with given id',
    type: ResidenceRoom,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'residenceroom not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResidenceRoom> {
    return this.residenceRoomService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current ResidenceRoom' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ResidenceRoom',
    type: ResidenceRoom,
  })
  @ApiResponse({
    status: 400,
    description:
      'residenceroom already exists|residence_id must be a string|residence_id is required|count is required|count must be a number|wall_closet is required' +
      '|wall_closet must be a boolean|drawer is required|drawer must be a boolean|hanger is required|hanger must be a boolean|double_bed is required' +
      '|double_bed must be a boolean|single_bed is required|single_bed must be a boolean|carpet is required|carpet must be a boolean' +
      '|heating_system is required|heating_system must be a boolean|cooling_system is required|cooling_system must be a boolean',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceroom not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceRoomDto: UpdateResidenceRoomDto,
  ): Promise<ResidenceRoom> {
    return this.residenceRoomService.update(+id, updateResidenceRoomDto);
  }

  @ApiBearerAuth()
  @UseGuards(HostJwtGuard)
  @ApiOperation({ summary: 'Delete current ResidenceRoom' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current ResidenceRoom',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'residenceroom not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.residenceRoomService.remove(+id);
  }
}

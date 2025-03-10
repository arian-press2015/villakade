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
import { FaqService } from './faq.service';
import { Faq, FilterFaqDto, CreateFaqDto, UpdateFaqDto } from './dto';
import { OwnerJwtGuard } from '../auth/guard';

@ApiTags('Faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Faq' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Faq',
    type: Faq,
  })
  @ApiResponse({
    status: 400,
    description:
      'faq already exists|faq_type must be a string|faq_type is required|question must be a string|question is required' +
      '| answer must be a string| answer is required',
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
  create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.create(createFaqDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the Faqs' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the Categories',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description:
      'faq_type must be a string|question must be a string|answer must be a string',
  })
  @Get('count')
  count(@Query() filterFaqDto: FilterFaqDto): Promise<number> {
    return this.faqService.getCount(filterFaqDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Faqs' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Faq],
  })
  @ApiResponse({
    status: 400,
    description:
      'offset must be a positive number|limit must be a positive number|sort must be a string|faq_type must be a string|question must be a string' +
      '|answer must be a string',
  })
  @Get()
  findAll(@Query() filterFaqDto: FilterFaqDto): Promise<Faq[]> {
    return this.faqService.findAll(filterFaqDto);
  }

  @ApiOperation({ summary: 'Get the Faq data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Faq associated with given id',
    type: Faq,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'faq not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Faq> {
    return this.faqService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update current Faq' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Faq',
    type: Faq,
  })
  @ApiResponse({
    status: 400,
    description:
      'faq_type must be a string|question must be a string|answer must be a string',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'faq not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<Faq> {
    return this.faqService.update(+id, updateFaqDto);
  }

  @ApiBearerAuth()
  @UseGuards(OwnerJwtGuard)
  @ApiOperation({ summary: 'Delete current Faq' })
  @ApiResponse({
    status: 204,
    description: 'Deletes current Faq',
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'faq not found|owner not found',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.faqService.remove(+id);
  }
}

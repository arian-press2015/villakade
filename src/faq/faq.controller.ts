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
import { FaqService } from './faq.service';
import { Faq, FilterFaqDto, CreateFaqDto, UpdateFaqDto } from './dto';

@ApiTags('Faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  // @ApiBearerAuth()
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
      'Faq already exists|Title must be a string|Fa_faq_type must be a string',
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
  create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.create(createFaqDto);
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
    description: 'Title must be a string|Fa_faq_type must be a string',
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
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Faq found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Faq> {
    return this.faqService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Faq' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Faq',
    type: Faq,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Faq found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<Faq> {
    return this.faqService.update(+id, updateFaqDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Faq' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Faq',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Faq found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.faqService.remove(+id);
  }
}

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
import { ContactUsService } from './contactUs.service';
import {
  ContactUs,
  FilterContactUsDto,
  CreateContactUsDto,
  UpdateContactUsDto,
} from './dto';

@ApiTags('ContactUs')
@Controller('contactUs')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new ContactUs' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new ContactUs',
    type: ContactUs,
  })
  @ApiResponse({
    status: 400,
    description:
      'contactus already exists|title must be a string|title is required|phone must be a string|phone is required|full_name is required' +
      '|full_name must be a string|description is required|description must be a string',
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
  create(@Body() createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    return this.contactUsService.create(createContactUsDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get count of the ContactUss' })
  @ApiResponse({
    status: 200,
    description: 'Returns count of the ContactUss',
    type: Number,
  })
  @ApiResponse({
    status: 400,
    description: 'full_name must be a string|description must be a string',
  })
  @Get('count')
  count(@Query() filterContactUsDto: FilterContactUsDto): Promise<number> {
    return this.contactUsService.getCount(filterContactUsDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the ContactUss' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the ContactUss',
    type: [ContactUs],
  })
  @ApiResponse({
    status: 400,
    description: 'full_name must be a string|description must be a string',
  })
  @Get()
  findAll(
    @Query() filterContactUsDto: FilterContactUsDto,
  ): Promise<ContactUs[]> {
    return this.contactUsService.findAll(filterContactUsDto);
  }

  @ApiOperation({ summary: 'Get the ContactUs data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the ContactUs associated with given id',
    type: ContactUs,
  })
  @ApiResponse({
    status: 400,
    description: 'id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'contactus not found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContactUs> {
    return this.contactUsService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current ContactUs' })
  @ApiResponse({
    status: 200,
    description: 'Updates current ContactUs',
    type: ContactUs,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'contactus not found|owner not found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactUsDto: UpdateContactUsDto,
  ): Promise<ContactUs> {
    return this.contactUsService.update(+id, updateContactUsDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current ContactUs' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current ContactUs',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "you don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'contactus not found|owner not found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.contactUsService.remove(+id);
  }
}

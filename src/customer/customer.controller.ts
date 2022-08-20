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
import { CustomerService } from './customer.service';
import {
  Customer,
  FilterCustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post()
  @ApiOperation({ summary: 'Create new Customer' })
  @ApiResponse({
    status: 201,
    description: 'Creates a new Customer',
    type: Customer,
  })
  @ApiResponse({
    status: 400,
    description:
      'Customer already exists|Title must be a string|Fa_first_name must be a string',
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
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Get all of the Customers' })
  @ApiResponse({
    status: 200,
    description: 'Returns all of the Categories',
    type: [Customer],
  })
  @ApiResponse({
    status: 400,
    description: 'Title must be a string|Fa_first_name must be a string',
  })
  @Get()
  findAll(@Query() filterCustomerDto: FilterCustomerDto): Promise<Customer[]> {
    return this.customerService.findAll(filterCustomerDto);
  }

  @ApiOperation({ summary: 'Get the Customer data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the Customer associated with given id',
    type: Customer,
  })
  @ApiResponse({
    status: 400,
    description: 'Id must be a positive number',
  })
  @ApiResponse({
    status: 404,
    description: 'No Customer found',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current Customer' })
  @ApiResponse({
    status: 200,
    description: 'Updates current Customer',
    type: Customer,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Customer found|No User found',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(+id, updateCustomerDto);
  }

  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current Customer' })
  @ApiResponse({
    status: 200,
    description: 'Deletes current Customer',
    type: Boolean,
  })
  @ApiResponse({
    status: 403,
    description: "You don't have permission to do that",
  })
  @ApiResponse({
    status: 404,
    description: 'No Customer found|No User found',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.customerService.remove(+id);
  }
}

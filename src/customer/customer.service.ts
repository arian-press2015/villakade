import { Injectable } from '@nestjs/common';
import {
  Customer,
  FilterCustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto,
} from './dto';

@Injectable()
export class CustomerService {
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = {
      id: 1,
      first_name: createCustomerDto.first_name,
      last_name: createCustomerDto.last_name,
      phone: createCustomerDto.phone,
      active: createCustomerDto.active,
    };
    return customer;
  }

  async getCount(filterCustomerDto: FilterCustomerDto): Promise<number> {
    return 1;
  }

  async findAll(filterCustomerDto: FilterCustomerDto): Promise<Customer[]> {
    const customer = [
      {
        id: 1,
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        active: true,
      },
    ];
    return customer;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = {
      id,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      active: true,
    };
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = {
      id,
      first_name: updateCustomerDto.first_name || 'arian',
      last_name: updateCustomerDto.last_name || 'press2015',
      phone: updateCustomerDto.phone || '+989012883045',
      active: true,
    };
    return customer;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

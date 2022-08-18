import { Injectable } from '@nestjs/common';
import {
  ContactUs,
  FilterContactUsDto,
  CreateContactUsDto,
  UpdateContactUsDto,
} from './dto';

@Injectable()
export class ContactUsService {
  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    const contactUs = {
      id: 1,
      email: createContactUsDto.email,
      phone: createContactUsDto.phone,
      full_name: createContactUsDto.full_name,
      description: createContactUsDto.description,
    };
    return contactUs;
  }

  async findAll(filterContactUsDto: FilterContactUsDto): Promise<ContactUs[]> {
    const contactUs = [
      {
        id: 1,
        email: 'arian.press2015@gmail.com',
        phone: '+989012883045',
        full_name: 'AP2015',
        description: 'Here I am',
      },
    ];
    return contactUs;
  }

  async findOne(id: number): Promise<ContactUs> {
    const contactUs = {
      id: 1,
      email: 'arian.press2015@gmail.com',
      phone: '+989012883045',
      full_name: 'AP2015',
      description: 'Here I am',
    };
    return contactUs;
  }

  async update(
    id: number,
    updateContactUsDto: UpdateContactUsDto,
  ): Promise<ContactUs> {
    const contactUs = {
      id,
      email: updateContactUsDto.email || 'arian.press2015@gmail.com',
      phone: updateContactUsDto.phone || 'ساحلی و رو به دریا',
      full_name: updateContactUsDto.full_name || 'AP2015',
      description: updateContactUsDto.description || 'Here I am',
    };
    return contactUs;
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

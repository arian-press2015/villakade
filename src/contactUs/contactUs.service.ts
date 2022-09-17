import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/services/prisma.service';
import {
  ContactUs,
  FilterContactUsDto,
  CreateContactUsDto,
  UpdateContactUsDto,
} from './dto';

const select = {
  id: true,
  full_name: true,
  phone: true,
  description: true,
  email: true,
};

@Injectable()
export class ContactUsService {
  constructor(private prisma: PrismaService) {}
  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    try {
      const contact_us = await this.prisma.contact_us.create({
        select,
        data: createContactUsDto,
      });
      return contact_us;
    } catch (e) {
      console.log('Error in ContactUsService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(filterContactUsDto: FilterContactUsDto): Promise<number> {
    const where: {
      full_name?: { contains: string };
      phone?: { contains: string };
      description?: { contains: string };
      email?: { contains: string };
    } = {};
    if (filterContactUsDto.full_name) {
      where.full_name = {
        contains: filterContactUsDto.full_name,
      };
    } else if (filterContactUsDto.phone) {
      where.phone = {
        contains: filterContactUsDto.phone,
      };
    } else if (filterContactUsDto.description) {
      where.description = {
        contains: filterContactUsDto.description,
      };
    } else if (filterContactUsDto.email) {
      where.email = {
        contains: filterContactUsDto.email,
      };
    }

    const contact_uss = await this.prisma.contact_us.count({
      where,
    });
    return contact_uss;
  }

  async findAll(filterContactUsDto: FilterContactUsDto): Promise<ContactUs[]> {
    const where: {
      full_name?: { contains: string };
      phone?: { contains: string };
      description?: { contains: string };
      email?: { contains: string };
    } = {};
    if (filterContactUsDto.full_name) {
      where.full_name = {
        contains: filterContactUsDto.full_name,
      };
    } else if (filterContactUsDto.phone) {
      where.phone = {
        contains: filterContactUsDto.phone,
      };
    } else if (filterContactUsDto.description) {
      where.description = {
        contains: filterContactUsDto.description,
      };
    } else if (filterContactUsDto.email) {
      where.email = {
        contains: filterContactUsDto.email,
      };
    }

    const orderBy = {};
    if (filterContactUsDto.sort) {
      filterContactUsDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const contact_uss = await this.prisma.contact_us.findMany({
      select,
      where,
      skip: filterContactUsDto.offset
        ? parseInt(filterContactUsDto.offset)
        : undefined,
      take: filterContactUsDto.limit
        ? parseInt(filterContactUsDto.limit)
        : undefined,
      orderBy,
    });
    return contact_uss;
  }

  async findOne(id: number): Promise<ContactUs> {
    const contact_us = await this.prisma.contact_us.findUnique({
      select,
      where: { id },
    });

    if (contact_us === null) {
      throw new BadRequestException('contact_us not found');
    }

    return contact_us;
  }

  async update(
    id: number,
    updateContactUsDto: UpdateContactUsDto,
  ): Promise<ContactUs> {
    try {
      const contact_us = await this.prisma.contact_us.update({
        select,
        data: {
          full_name: updateContactUsDto.full_name,
          phone: updateContactUsDto.phone,
          description: updateContactUsDto.description,
          email: updateContactUsDto.email,
        },
        where: {
          id,
        },
      });
      return contact_us;
    } catch (e) {
      console.log('Error in ContactUsService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('contact_us not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.contact_us.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('contact_us not found');
      }
    }
  }
}

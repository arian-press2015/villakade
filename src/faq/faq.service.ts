import { BadRequestException, Injectable } from '@nestjs/common';
import { faq_faq_type } from '@prisma/client';
import { PrismaService } from '../shared/services/prisma.service';
import { Faq, FilterFaqDto, CreateFaqDto, UpdateFaqDto } from './dto';

const select = {
  id: true,
  faq_type: true,
  question: true,
  answer: true,
};

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}
  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    try {
      if (!['residence', 'guest', 'general'].includes(createFaqDto.faq_type)) {
        throw new BadRequestException('faq_type is invalid');
      }
      const faq = await this.prisma.faq.create({
        select,
        data: {
          faq_type: faq_faq_type[createFaqDto.faq_type],
          question: createFaqDto.question,
          answer: createFaqDto.answer,
        },
      });
      return faq;
    } catch (e) {
      console.log('Error in FaqService.create()', e.code, e.meta);
      throw e;
    }
  }

  async getCount(filterFaqDto: FilterFaqDto): Promise<number> {
    const where: {
      question?: { contains: string };
      answer?: { contains: string };
      faq_type?: faq_faq_type;
    } = {};
    if (filterFaqDto.question) {
      where.question = {
        contains: filterFaqDto.question,
      };
    } else if (filterFaqDto.answer) {
      where.answer = {
        contains: filterFaqDto.answer,
      };
    } else if (filterFaqDto.faq_type) {
      where.faq_type = faq_faq_type[filterFaqDto.faq_type];
    }

    const faqs = await this.prisma.faq.count({
      where,
    });
    return faqs;
  }

  async findAll(filterFaqDto: FilterFaqDto): Promise<Faq[]> {
    const where: {
      question?: { contains: string };
      answer?: { contains: string };
      faq_type?: faq_faq_type;
    } = {};
    if (filterFaqDto.question) {
      where.question = {
        contains: filterFaqDto.question,
      };
    } else if (filterFaqDto.answer) {
      where.answer = {
        contains: filterFaqDto.answer,
      };
    } else if (filterFaqDto.faq_type) {
      where.faq_type = faq_faq_type[filterFaqDto.faq_type];
    }

    const orderBy = {};
    if (filterFaqDto.sort) {
      filterFaqDto.sort.split(',').forEach((item) => {
        const sortItem = item.split(':');
        orderBy[sortItem[0]] = sortItem[1];
      });
    }

    const faqs = await this.prisma.faq.findMany({
      select,
      where,
      skip: filterFaqDto.offset ? parseInt(filterFaqDto.offset) : undefined,
      take: filterFaqDto.limit ? parseInt(filterFaqDto.limit) : undefined,
      orderBy,
    });
    return faqs;
  }

  async findOne(id: number): Promise<Faq> {
    const faq = await this.prisma.faq.findUnique({
      select,
      where: { id },
    });

    if (faq === null) {
      throw new BadRequestException('faq not found');
    }

    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    try {
      if (
        updateFaqDto.faq_type &&
        !['residence', 'guest', 'general'].includes(updateFaqDto.faq_type)
      ) {
        throw new BadRequestException('faq_type is invalid');
      }
      const faq = await this.prisma.faq.update({
        select,
        data: {
          question: updateFaqDto.question,
          answer: updateFaqDto.answer,
          faq_type: faq_faq_type[updateFaqDto.faq_type],
        },
        where: {
          id,
        },
      });
      return faq;
    } catch (e) {
      console.log('Error in FaqService.update()', e.code, e.meta);
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to update not found.'
      ) {
        throw new BadRequestException('faq not found');
      }
      throw e;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.faq.delete({ where: { id } });
      return;
    } catch (e) {
      if (
        e.code &&
        e.code === 'P2025' &&
        e.meta.cause === 'Record to delete does not exist.'
      ) {
        throw new BadRequestException('faq not found');
      }
    }
  }
}

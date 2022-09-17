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
    return 1;
  }

  async findAll(filterFaqDto: FilterFaqDto): Promise<Faq[]> {
    const faq = [
      {
        id: 1,
        faq_type: 'residence',
        question: 'چطور ویلا اجاره کنیم؟',
        answer: 'به سادگی',
      },
    ];
    return faq;
  }

  async findOne(id: number): Promise<Faq> {
    const faq = {
      id,
      faq_type: 'residence',
      question: 'چطور ویلا اجاره کنیم؟',
      answer: 'به سادگی',
    };
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = {
      id,
      faq_type: updateFaqDto.faq_type || 'residence',
      question: updateFaqDto.question || 'چطور ویلا اجاره کنیم؟',
      answer: updateFaqDto.answer || 'به سادگی',
    };
    return faq;
  }

  async remove(id: number): Promise<void> {
    return;
  }
}

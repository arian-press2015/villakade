import { Injectable } from '@nestjs/common';
import { Faq, FilterFaqDto, CreateFaqDto, UpdateFaqDto } from './dto';

@Injectable()
export class FaqService {
  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = {
      id: 1,
      faq_type: createFaqDto.faq_type,
      question: createFaqDto.question,
      answer: createFaqDto.answer,
    };
    return faq;
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

  async remove(id: number): Promise<boolean> {
    return true;
  }
}

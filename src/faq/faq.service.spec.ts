import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { faq_faq_type } from '@prisma/client';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateFaqDto, FilterFaqDto, Faq } from './dto';
import { FaqService } from './faq.service';

const select = {
  id: true,
  faq_type: true,
  question: true,
  answer: true,
};

describe('FaqService', () => {
  let service: FaqService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FaqService,
        {
          provide: PrismaService,
          useFactory: () => PrismaMockService,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
          load: [configuration],
          cache: true,
        }),
      ],
    }).compile();

    service = module.get<FaqService>(FaqService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateFaqDto): Promise<Faq>', () => {
    const faq: Faq = {
      id: 1,
      faq_type: 'residence',
      question: 'چطور ویلا اجاره بدیم؟',
      answer: 'به سادگی',
    };

    it('should create new Faq and return it', async () => {
      // mock prisma return value
      PrismaMockService.faq.create.mockResolvedValue(faq);

      const dto: CreateFaqDto = {
        faq_type: 'residence',
        question: 'چطور ویلا اجاره بدیم؟',
        answer: 'به سادگی',
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(faq);
      expect(prisma.faq.create).toBeCalledWith({ select, data: dto });
      expect(prisma.faq.create).toBeCalledTimes(1);
    });

    it('should throw error if the faq faq_type is invalid', async () => {
      const dto: CreateFaqDto = {
        faq_type: 'invalid_type',
        question: 'چطور ویلا اجاره بدیم؟',
        answer: 'به سادگی',
      };

      await expect(service.create(dto)).rejects.toThrow('faq_type is invalid');
    });
  });

  describe('async findAll(dto: FilterFaqDto): Promise<Faq[]>', () => {
    const faqs = [
      {
        id: 1,
        faq_type: 'residence',
        question: 'چطور ویلا اجاره بدیم؟',
        answer: 'بسادگی',
      },
      {
        id: 2,
        faq_type: 'guest',
        question: 'چطور ویلا اجاره کنیم؟',
        answer: 'به سختی',
      },
    ];

    it('should return all faqs', async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue(faqs);

      const dto: FilterFaqDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(faqs);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it("should return all faqs where question === 'بدیم؟'", async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue([faqs[0]]);

      const dto: FilterFaqDto = {
        question: 'بدیم؟',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([faqs[0]]);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: { question: { contains: 'بدیم؟' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it("should return all faqs where answer === 'به'", async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue([faqs[0]]);

      const dto: FilterFaqDto = {
        answer: 'به',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([faqs[0]]);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: { answer: { contains: 'به' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it("should return all faqs where faq_type === 'residence'", async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue([faqs[0]]);

      const dto: FilterFaqDto = {
        faq_type: 'residence',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([faqs[0]]);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: { faq_type: 'residence' },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it('should return faqs based on limit', async () => {
      // mock prisma return value
      const mockData: Faq[] = [faqs[0]];
      PrismaMockService.faq.findMany.mockResolvedValue(mockData);

      const dto: FilterFaqDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it('should return faqs based on offset', async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue([faqs[1]]);

      const dto: FilterFaqDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([faqs[1]]);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });

    it('should sort faqs based on sort', async () => {
      // mock prisma return value
      PrismaMockService.faq.findMany.mockResolvedValue([faqs[1], faqs[0]]);

      const dto: FilterFaqDto = {
        sort: 'question:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([faqs[1], faqs[0]]);
      expect(prisma.faq.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { question: 'desc' },
      });
      expect(prisma.faq.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterFaqDto): Promise<number>', () => {
    it("should return faq count based on question === 'بدیم؟'", async () => {
      // mock prisma return value
      PrismaMockService.faq.count.mockResolvedValue(1);

      const dto: FilterFaqDto = {
        question: 'بدیم؟',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.faq.count).toBeCalledWith({
        where: { question: { contains: 'بدیم؟' } },
      });
      expect(prisma.faq.count).toBeCalledTimes(1);
    });

    it("should return faq count based on answer === 'به'", async () => {
      // mock prisma return value
      PrismaMockService.faq.count.mockResolvedValue(1);

      const dto: FilterFaqDto = {
        answer: 'به',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.faq.count).toBeCalledWith({
        where: { answer: { contains: 'به' } },
      });
      expect(prisma.faq.count).toBeCalledTimes(1);
    });

    it("should return faq count based on faq_type === 'residence'", async () => {
      // mock prisma return value
      PrismaMockService.faq.count.mockResolvedValue(1);

      const dto: FilterFaqDto = {
        faq_type: 'residence',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.faq.count).toBeCalledWith({
        where: { faq_type: 'residence' },
      });
      expect(prisma.faq.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Faq>', () => {
    const faq = {
      id: 1,
      faq_type: 'residence',
      question: 'چطور ویلا اجاره بدیم؟',
      answer: 'به سادگی',
    };

    it('should return faq by id', async () => {
      // mock prisma return value
      PrismaMockService.faq.findUnique.mockResolvedValue(faq);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(faq);
      expect(prisma.faq.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.faq.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.faq.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('faq not found');
    });
  });

  describe('async update(id: string, updateFaqDto: UpdateFaqDto): Promise<Faq>', () => {
    const faq = {
      id: 1,
      name: 'shiraz',
      fa_name: 'شیراز',
      total_residence_count: 1,
      province: {
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
      },
    };
    it('should update faq by id', async () => {
      // mock prisma return value
      PrismaMockService.faq.update.mockResolvedValue(faq);

      const result = await service.update(1, {
        question: 'soal',
        answer: 'javab',
        faq_type: 'general',
      });
      expect(result).toStrictEqual(faq);
      expect(prisma.faq.update).toBeCalledWith({
        select,
        data: {
          question: 'soal',
          answer: 'javab',
          faq_type: faq_faq_type['general'],
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.faq.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.faq.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { question: 'soal' })).rejects.toThrow(
        'faq not found',
      );
    });

    it('should throw error if the faq faq_type is invalid', async () => {
      await expect(service.update(2, { faq_type: 'invalid' })).rejects.toThrow(
        'faq_type is invalid',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const faq = {
      id: 1,
      faq_type: 'residence',
      question: 'چطور ویلا اجاره بدیم؟',
      answer: 'به سادگی',
    };

    it('should delete faq by id', async () => {
      // mock prisma return value
      PrismaMockService.faq.delete.mockResolvedValue(faq);

      await service.remove(1);
      expect(prisma.faq.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.faq.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.faq.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('faq not found');
    });
  });
});

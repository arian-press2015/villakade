import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
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
      question: 'چطور ویلا اجاره کنیم؟',
      answer: 'به سادگی',
    };

    it('should create new Faq and return it', async () => {
      // mock prisma return value
      PrismaMockService.faq.create.mockResolvedValue(faq);

      const dto: CreateFaqDto = {
        faq_type: 'residence',
        question: 'چطور ویلا اجاره کنیم؟',
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
        question: 'چطور ویلا اجاره کنیم؟',
        answer: 'به سادگی',
      };

      await expect(service.create(dto)).rejects.toThrow('faq_type is invalid');
    });
  });
});

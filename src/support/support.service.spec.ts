import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateSupportDto, FilterSupportDto, Support } from './dto';
import { SupportService } from './support.service';

const select = {
  id: true,
  full_name: true,
  phone: true,
  active: true,
};

describe('SupportService', () => {
  let service: SupportService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportService,
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

    service = module.get<SupportService>(SupportService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateSupportDto): Promise<Support>', () => {
    const support: Support = {
      id: 1,
      full_name: 'AP2015',
      phone: '+989012883045',
      active: true,
    };

    it('should create new Support and return it', async () => {
      // mock prisma return value
      PrismaMockService.support.create.mockResolvedValue(support);

      const dto: CreateSupportDto = {
        full_name: 'AP2015',
        phone: '+989012883045',
        active: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(support);
      expect(prisma.support.create).toBeCalledWith({ select, data: dto });
      expect(prisma.support.create).toBeCalledTimes(1);
    });
  });
});

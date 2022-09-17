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

  describe('async findAll(dto: FilterSupportDto): Promise<Support[]>', () => {
    const supports = [
      {
        id: 1,
        full_name: 'AP2015',
        phone: '+989012883045',
        active: true,
      },
      {
        id: 2,
        full_name: 'ES2015',
        phone: '+989132233694',
        active: false,
      },
    ];

    it('should return all supports', async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue(supports);

      const dto: FilterSupportDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(supports);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it("should return all supports where full_name === 'AP'", async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue([supports[0]]);

      const dto: FilterSupportDto = {
        full_name: 'AP',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([supports[0]]);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: { full_name: { contains: 'AP' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it("should return all supports where phone === '45'", async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue([supports[0]]);

      const dto: FilterSupportDto = {
        phone: '45',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([supports[0]]);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: { phone: { contains: '45' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it("should return all supports where active === 'true'", async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue([supports[0]]);

      const dto: FilterSupportDto = {
        active: 'true',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([supports[0]]);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: { active: true },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it('should return supports based on limit', async () => {
      // mock prisma return value
      const mockData: Support[] = [supports[0]];
      PrismaMockService.support.findMany.mockResolvedValue(mockData);

      const dto: FilterSupportDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it('should return supports based on offset', async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue([supports[1]]);

      const dto: FilterSupportDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([supports[1]]);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });

    it('should sort supports based on sort', async () => {
      // mock prisma return value
      PrismaMockService.support.findMany.mockResolvedValue([
        supports[1],
        supports[0],
      ]);

      const dto: FilterSupportDto = {
        sort: 'full_name:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([supports[1], supports[0]]);
      expect(prisma.support.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { full_name: 'desc' },
      });
      expect(prisma.support.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterSupportDto): Promise<number>', () => {
    it("should return support count based on full_name=='AP'", async () => {
      // mock prisma return value
      PrismaMockService.support.count.mockResolvedValue(1);

      const dto: FilterSupportDto = {
        full_name: 'AP',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.support.count).toBeCalledWith({
        where: { full_name: { contains: 'AP' } },
      });
      expect(prisma.support.count).toBeCalledTimes(1);
    });

    it("should return support count based on phone=='45'", async () => {
      // mock prisma return value
      PrismaMockService.support.count.mockResolvedValue(1);

      const dto: FilterSupportDto = {
        phone: '45',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.support.count).toBeCalledWith({
        where: { phone: { contains: '45' } },
      });
      expect(prisma.support.count).toBeCalledTimes(1);
    });

    it("should return support count based on active === 'true'", async () => {
      // mock prisma return value
      PrismaMockService.support.count.mockResolvedValue(1);

      const dto: FilterSupportDto = {
        active: 'true',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.support.count).toBeCalledWith({
        where: { active: true },
      });
      expect(prisma.support.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Support>', () => {
    const support = {
      id: 1,
      full_name: 'AP2015',
      phone: '+989012883045',
      active: true,
    };
    it('should return support by id', async () => {
      // mock prisma return value
      PrismaMockService.support.findUnique.mockResolvedValue(support);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(support);
      expect(prisma.support.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.support.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.support.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('support not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const support = {
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
    it('should delete support by id', async () => {
      // mock prisma return value
      PrismaMockService.support.delete.mockResolvedValue(support);

      await service.remove(1);
      expect(prisma.support.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.support.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.support.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('support not found');
    });
  });
});

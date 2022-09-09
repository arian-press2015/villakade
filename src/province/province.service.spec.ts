import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateProvinceDto, FilterProvinceDto, Province } from './dto';
import { ProvinceService } from './province.service';

const select = {
  id: true,
  name: true,
  fa_name: true,
  city: {
    select: {
      id: true,
      name: true,
      fa_name: true,
      total_residence_count: true,
    },
  },
};

describe('ProvinceService', () => {
  let service: ProvinceService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinceService,
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

    service = module.get<ProvinceService>(ProvinceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateProvinceDto): Promise<Province>', () => {
    it('should create new Province and return it', async () => {
      // mock prisma return value
      PrismaMockService.province.create.mockResolvedValue({
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
        city: [],
      });

      const dto: CreateProvinceDto = {
        name: 'fars',
        fa_name: 'فارس',
      };
      const result = await service.create(dto);
      expect(result).toStrictEqual({
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
        city: [],
      });
      expect(prisma.province.create).toBeCalledWith({ select, data: dto });
      expect(prisma.province.create).toBeCalledTimes(1);
    });

    it('should throw error if the province already exists', async () => {
      // mock prisma return value
      PrismaMockService.province.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'province_name_UN' },
      });

      const dto: CreateProvinceDto = {
        name: 'fars',
        fa_name: 'فارس',
      };

      await expect(service.create(dto)).rejects.toThrow(
        'province already exists',
      );
    });
  });

  describe('async findAll(dto: FilterProvinceDto): Promise<Province[]>', () => {
    const provinces = [
      {
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
        city: [
          {
            id: 1,
            name: 'shiraz',
            fa_name: 'شیراز',
            total_residence_count: 1,
          },
          {
            id: 2,
            name: 'kazerun',
            fa_name: 'کازرون',
            total_residence_count: 0,
          },
        ],
      },
      {
        id: 2,
        name: 'esfahan',
        fa_name: 'اصفهان',
        city: [
          {
            id: 1,
            name: 'kashan',
            fa_name: 'کاشان',
            total_residence_count: 1,
          },
        ],
      },
    ];

    it('should return all provinces', async () => {
      // mock prisma return value
      PrismaMockService.province.findMany.mockResolvedValue(provinces);

      const dto: FilterProvinceDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(provinces);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it("should return all provinces where name === 'fa'", async () => {
      // mock prisma return value
      PrismaMockService.province.findMany.mockResolvedValue([provinces[0]]);

      const dto: FilterProvinceDto = {
        name: 'fa',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[0]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: { name: { contains: 'fa' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it("should return all provinces where fa_name === 'فا'", async () => {
      // mock prisma return value
      PrismaMockService.province.findMany.mockResolvedValue([provinces[0]]);

      const dto: FilterProvinceDto = {
        fa_name: 'فا',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[0]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: { fa_name: { contains: 'فا' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it('should return provinces based on limit', async () => {
      // mock prisma return value
      const mockData: Province[] = [provinces[0]];
      mockData[0].city.pop();
      PrismaMockService.province.findMany.mockResolvedValue(mockData);

      const dto: FilterProvinceDto = {
        fa_name: 'فا',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: { fa_name: { contains: 'فا' } },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it('should return provinces based on offset', async () => {
      // mock prisma return value
      PrismaMockService.province.findMany.mockResolvedValue([provinces[1]]);

      const dto: FilterProvinceDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[1]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it('should sort provinces based on sort', async () => {
      // mock prisma return value
      PrismaMockService.province.findMany.mockResolvedValue([
        provinces[1],
        provinces[0],
      ]);

      const dto: FilterProvinceDto = {
        sort: 'name:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[1], provinces[0]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { name: 'asc' },
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterProvinceDto): Promise<number>', () => {
    it('should return province count based on limit', async () => {
      // mock prisma return value
      PrismaMockService.province.count.mockResolvedValue(1);

      const dto: FilterProvinceDto = {
        limit: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.province.count).toBeCalledWith({
        where: {},
        skip: undefined,
        take: 1,
      });
      expect(prisma.province.count).toBeCalledTimes(1);
    });

    it('should return province count based on offset', async () => {
      // mock prisma return value
      PrismaMockService.province.count.mockResolvedValue(1);

      const dto: FilterProvinceDto = {
        offset: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.province.count).toBeCalledWith({
        where: {},
        skip: 1,
        take: undefined,
      });
      expect(prisma.province.count).toBeCalledTimes(1);
    });

    it("should return province count based on name=='fa'", async () => {
      // mock prisma return value
      PrismaMockService.province.count.mockResolvedValue(1);

      const dto: FilterProvinceDto = {
        name: 'fa',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.province.count).toBeCalledWith({
        where: { name: { contains: 'fa' } },
        skip: undefined,
        take: undefined,
      });
      expect(prisma.province.count).toBeCalledTimes(1);
    });
  });
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import prismaMockService from '../shared/services/prismaMock.service';
import { CreateProvinceDto, FilterProvinceDto } from './dto';
import { ProvinceService } from './province.service';

const select = {
  id: true,
  name: true,
  fa_name: true,
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
          useFactory: () => prismaMockService,
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
      prismaMockService.province.create.mockResolvedValue({
        id: 1,
        name: 'fars',
        fa_name: 'فارس',
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
      });
      expect(prisma.province.create).toBeCalledWith({ select, data: dto });
      expect(prisma.province.create).toBeCalledTimes(1);
    });

    it('should throw error if the province already exists', async () => {
      // mock prisma return value
      prismaMockService.province.create.mockRejectedValue({
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
      },
      {
        id: 2,
        name: 'esfahan',
        fa_name: 'اصفهان',
      },
    ];

    it('should return all provinces', async () => {
      // mock prisma return value
      prismaMockService.province.findMany.mockResolvedValue(provinces);

      const dto: FilterProvinceDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(provinces);
      expect(prisma.province.findMany).toBeCalledWith({ select, where: {} });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it("should return all provinces where name === 'fa'", async () => {
      // mock prisma return value
      prismaMockService.province.findMany.mockResolvedValue([provinces[0]]);

      const dto: FilterProvinceDto = {
        name: 'fa',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[0]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: { name: { contains: 'fa' } },
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });

    it("should return all provinces where fa_name === 'فا'", async () => {
      // mock prisma return value
      prismaMockService.province.findMany.mockResolvedValue([provinces[0]]);

      const dto: FilterProvinceDto = {
        fa_name: 'فا',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([provinces[0]]);
      expect(prisma.province.findMany).toBeCalledWith({
        select,
        where: { fa_name: { contains: 'فا' } },
      });
      expect(prisma.province.findMany).toBeCalledTimes(1);
    });
  });
});

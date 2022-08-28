import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import prismaMockService from '../shared/services/prismaMock.service';
import { CreateProvinceDto } from './dto';
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
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateCityDto, FilterCityDto, City } from './dto';
import { CityService } from './city.service';

const select = {
  id: true,
  name: true,
  fa_name: true,
  total_residence_count: true,
  province: {
    select: {
      id: true,
      name: true,
      fa_name: true,
    },
  },
};

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
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

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateCityDto): Promise<City>', () => {
    const city: City = {
      id: 1,
      name: 'fars',
      fa_name: 'فارس',
      total_residence_count: 1,
      province: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
      },
    };

    it('should create new City and return it', async () => {
      // mock prisma return value
      PrismaMockService.city.create.mockResolvedValue(city);

      const dto: CreateCityDto = {
        name: 'fars',
        fa_name: 'فارس',
        province_id: 1,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(city);
      expect(prisma.city.create).toBeCalledWith({ select, data: dto });
      expect(prisma.city.create).toBeCalledTimes(1);
    });

    it('should throw error if the province name already taken', async () => {
      // mock prisma return value
      PrismaMockService.city.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'city_name_UN' },
      });

      const dto: CreateCityDto = {
        name: 'fars',
        fa_name: 'فارس',
        province_id: 1,
      };

      await expect(service.create(dto)).rejects.toThrow('name is taken before');
    });

    it('should throw error if the city fa_name already taken', async () => {
      // mock prisma return value
      PrismaMockService.city.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'city_fa_name_UN' },
      });

      const dto: CreateCityDto = {
        name: 'fars',
        fa_name: 'فارس',
        province_id: 1,
      };

      await expect(service.create(dto)).rejects.toThrow(
        'fa_name is taken before',
      );
    });
  });
});

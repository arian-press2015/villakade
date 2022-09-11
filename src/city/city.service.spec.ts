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

  describe('async findAll(dto: FilterCityDto): Promise<City[]>', () => {
    const cities = [
      {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 1,
        province: {
          id: 1,
          name: 'fars',
          fa_name: 'فارس',
        },
      },
      {
        id: 2,
        name: 'kashan',
        fa_name: 'کاشان',
        total_residence_count: 1,
        province: {
          id: 2,
          name: 'esfahan',
          fa_name: 'اصفهان',
        },
      },
    ];

    it('should return all cities', async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue(cities);

      const dto: FilterCityDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(cities);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it("should return all cities where name === 'fa'", async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue([cities[0]]);

      const dto: FilterCityDto = {
        name: 'fa',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([cities[0]]);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: { name: { contains: 'fa' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it("should return all cities where fa_name === 'فا'", async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue([cities[0]]);

      const dto: FilterCityDto = {
        fa_name: 'فا',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([cities[0]]);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: { fa_name: { contains: 'فا' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it("should return all cities where province_id === '1'", async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue([cities[0]]);

      const dto: FilterCityDto = {
        province_id: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([cities[0]]);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: { province_id: 1 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it('should return cities based on limit', async () => {
      // mock prisma return value
      const mockData: City[] = [cities[0]];
      PrismaMockService.city.findMany.mockResolvedValue(mockData);

      const dto: FilterCityDto = {
        fa_name: 'فا',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: { fa_name: { contains: 'فا' } },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it('should return cities based on offset', async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue([cities[1]]);

      const dto: FilterCityDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([cities[1]]);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });

    it('should sort cities based on sort', async () => {
      // mock prisma return value
      PrismaMockService.city.findMany.mockResolvedValue([cities[1], cities[0]]);

      const dto: FilterCityDto = {
        sort: 'name:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([cities[1], cities[0]]);
      expect(prisma.city.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { name: 'asc' },
      });
      expect(prisma.city.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterCityDto): Promise<number>', () => {
    it("should return city count based on name=='fa'", async () => {
      // mock prisma return value
      PrismaMockService.city.count.mockResolvedValue(1);

      const dto: FilterCityDto = {
        name: 'fa',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.city.count).toBeCalledWith({
        where: { name: { contains: 'fa' } },
      });
      expect(prisma.city.count).toBeCalledTimes(1);
    });

    it("should return city count based on fa_name=='فا'", async () => {
      // mock prisma return value
      PrismaMockService.city.count.mockResolvedValue(1);

      const dto: FilterCityDto = {
        fa_name: 'فا',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.city.count).toBeCalledWith({
        where: { fa_name: { contains: 'فا' } },
      });
      expect(prisma.city.count).toBeCalledTimes(1);
    });

    it("should return city count based on province_id === '1'", async () => {
      // mock prisma return value
      PrismaMockService.city.count.mockResolvedValue(1);

      const dto: FilterCityDto = {
        province_id: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.city.count).toBeCalledWith({
        where: { province_id: 1 },
      });
      expect(prisma.city.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<City>', () => {
    const city = {
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
    it('should return city by id', async () => {
      // mock prisma return value
      PrismaMockService.city.findUnique.mockResolvedValue(city);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(city);
      expect(prisma.city.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.city.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.city.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('city not found');
    });
  });

  describe('async update(id: string, updateCityDto: UpdateCityDto): Promise<City>', () => {
    const city = {
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
    it('should update city by id', async () => {
      // mock prisma return value
      PrismaMockService.city.update.mockResolvedValue(city);

      const result = await service.update(1, {
        name: 'shirazz',
        province_id: 2,
      });
      expect(result).toStrictEqual(city);
      expect(prisma.city.update).toBeCalledWith({
        select,
        data: {
          name: 'shirazz',
          fa_name: undefined,
          province_id: 2,
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.city.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.city.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { name: 'name' })).rejects.toThrow(
        'city not found',
      );
    });

    it('should throw error if the city name already taken', async () => {
      // mock prisma return value
      PrismaMockService.city.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'city_name_UN' },
      });

      await expect(service.update(2, { name: 'kashan' })).rejects.toThrow(
        'name is taken before',
      );
    });

    it('should throw error if the city fa_name already taken', async () => {
      // mock prisma return value
      PrismaMockService.city.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'city_fa_name_UN' },
      });

      await expect(service.update(2, { fa_name: 'کاشان' })).rejects.toThrow(
        'fa_name is taken before',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const city = {
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
    it('should delete city by id', async () => {
      // mock prisma return value
      PrismaMockService.city.delete.mockResolvedValue(city);

      await service.remove(1);
      expect(prisma.city.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.city.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.city.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('city not found');
    });
  });
});

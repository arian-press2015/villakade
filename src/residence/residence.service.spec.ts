import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateResidenceDto, FilterResidenceDto, Residence } from './dto';
import { ResidenceService } from './residence.service';

const select = {
  id: true,
  host_id: true,
  title: true,
  type: {
    select: {
      id: true,
      title: true,
      fa_title: true,
    },
  },
  location: true,
  price: true,
  active: true,
  city: {
    select: {
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
    },
  },
};

describe('CityService', () => {
  let service: ResidenceService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceService,
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

    service = module.get<ResidenceService>(ResidenceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateCityDto): Promise<City>', () => {
    const residence: Residence = {
      id: 1,
      host_id: 123,
      title: 'vila',
      type: {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
      location: 'inja',
      price: 11111,
      active: false,
      city: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
        province: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
        },
      },
    };

    it('should create new Residence and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence.create.mockResolvedValue(residence);

      const dto: CreateResidenceDto = {
        title: 'vila',
        city_id: 1,
        host_id: 123,
        location: 'inja',
        type_id: 1,
        price: 11111,
        active: false,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence);
      expect(prisma.residence.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceDto): Promise<Residence[]>', () => {
    const residences: Residence[] = [
      {
        id: 1,
        host_id: 123,
        title: 'vila',
        type: {
          id: 1,
          title: 'apartment',
          fa_title: 'آپارتمان',
        },
        location: 'inja',
        price: 11111,
        active: false,
        city: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
          total_residence_count: 4,
          province: {
            id: 1,
            name: 'shiraz',
            fa_name: 'شیراز',
          },
        },
      },
      {
        id: 2,
        host_id: 123,
        title: 'vila2',
        type: {
          id: 1,
          title: 'apartment',
          fa_title: 'آپارتمان',
        },
        location: 'unja',
        price: 22222,
        active: false,
        city: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
          total_residence_count: 5,
          province: {
            id: 1,
            name: 'shiraz',
            fa_name: 'شیراز',
          },
        },
      },
    ];

    it('should return all residences', async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue(residences);

      const dto: FilterResidenceDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residences);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where title === 'vila'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        title: 'vila',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { title: { contains: 'vila' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where host_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        host_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { host_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where type_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        type_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { type_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where city_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        city_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { city_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where price === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        price: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { price: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where location === 'inja'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        location: 'inja',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { location: { contains: 'inja' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where active === 'true'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        active: 'true',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { active: true },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it('should return residences based on limit', async () => {
      // mock prisma return value
      const mockData: Residence[] = [residences[0]];
      PrismaMockService.residence.findMany.mockResolvedValue(mockData);

      const dto: FilterResidenceDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it('should return residences based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it('should sort residences based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([
        residences[1],
        residences[0],
      ]);

      const dto: FilterResidenceDto = {
        sort: 'name:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1], residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { name: 'asc' },
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceDto): Promise<number>', () => {
    it('should return total count of residences', async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {};
      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: {},
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where title === 'vila'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        title: 'vila',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { title: { contains: 'vila' } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where host_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        host_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { host_id: 123 },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where type_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        type_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { type_id: 123 },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where city_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        city_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { city_id: 123 },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where price === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        price: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { price: 123 },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where location === 'inja'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        location: 'inja',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { location: { contains: 'inja' } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return total count of residences where active === 'true'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(2);

      const dto: FilterResidenceDto = {
        active: 'true',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(2);
      expect(prisma.residence.count).toBeCalledWith({
        where: { active: true },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });
  });
});

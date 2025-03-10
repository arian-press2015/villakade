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
  normal_capacity: true,
  max_capacity: true,
  about: true,
  residence_price: {
    select: {
      residence_id: true,
      weekday_price: true,
      weekend_price: true,
      peak_price: true,
      extra_guest_weekday: true,
      extra_guest_weekend: true,
      extra_guest_peak: true,
    },
  },
  residence_image: {
    select: {
      id: true,
      residence_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
  residence_category: {
    select: {
      category: {
        select: {
          id: true,
          title: true,
          fa_title: true,
        },
      },
    },
  },
};

describe('ResidenceService', () => {
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
      normal_capacity: 2,
      max_capacity: 4,
      about: 'this is my residence',
      residence_price: {
        residence_id: 123,
        weekday_price: 5,
        weekend_price: 5,
        peak_price: 5,
        extra_guest_weekday: 5,
        extra_guest_weekend: 5,
        extra_guest_peak: 5,
      },
      residence_image: [
        {
          id: 111,
          residence_id: 123,
          url: '/file/is/here',
          width: 600,
          height: 800,
        },
      ],
      residence_category: [
        {
          category: {
            id: 111,
            title: 'beach',
            fa_title: 'ساحلی',
          },
        },
      ],
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
        active: false,
        normal_capacity: 2,
        max_capacity: 4,
        about: 'this is my residence',
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

  describe('async createResidenceCategory(dto: CreateResidenceCategoryDto): Promise<void>', () => {
    it('should create new ResidenceCategory', async () => {
      // mock prisma return value
      PrismaMockService.residence_category.createMany.mockResolvedValue({
        count: 2,
      });

      const data = {
        residence_id: 1,
        category_id: [1, 2],
      };

      const query = [
        { residence_id: 1, category_id: 1 },
        { residence_id: 1, category_id: 2 },
      ];

      await service.createResidenceCategory(data);
      expect(prisma.residence_category.createMany).toBeCalledWith({
        data: query,
      });
      expect(prisma.residence_category.createMany).toBeCalledTimes(1);
    });

    it("should throw if residence_id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_category.createMany.mockRejectedValue({
        code: 'P2003',
        meta: { field_name: 'residence_id' },
      });

      const data = {
        residence_id: 123456,
        category_id: [1, 2],
      };

      await expect(service.createResidenceCategory(data)).rejects.toThrow(
        'residence not found',
      );
    });

    it("should throw if category_id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_category.createMany.mockRejectedValue({
        code: 'P2003',
        meta: { field_name: 'category_id' },
      });

      const data = {
        residence_id: 1,
        category_id: [1, 222222],
      };

      await expect(service.createResidenceCategory(data)).rejects.toThrow(
        'category not found',
      );
    });

    it('should throw if residenceCategory already exists', async () => {
      // mock prisma return value
      PrismaMockService.residence_category.createMany.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'PRIMARY' },
      });

      const data = {
        residence_id: 1,
        category_id: [1, 2],
      };

      await expect(service.createResidenceCategory(data)).rejects.toThrow(
        'residenceCategory already exists',
      );
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
        normal_capacity: 2,
        max_capacity: 4,
        about: 'this is my residence',
        residence_price: {
          residence_id: 123,
          weekday_price: 5,
          weekend_price: 5,
          peak_price: 5,
          extra_guest_weekday: 5,
          extra_guest_weekend: 5,
          extra_guest_peak: 5,
        },
        residence_image: [
          {
            id: 111,
            residence_id: 123,
            url: '/file/is/here',
            width: 600,
            height: 800,
          },
        ],
        residence_category: [
          {
            category: {
              id: 111,
              title: 'beach',
              fa_title: 'ساحلی',
            },
          },
        ],
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
        normal_capacity: 2,
        max_capacity: 4,
        about: 'this is my residence',
        residence_price: {
          residence_id: 123,
          weekday_price: 10,
          weekend_price: 10,
          peak_price: 10,
          extra_guest_weekday: 10,
          extra_guest_weekend: 10,
          extra_guest_peak: 10,
        },
        residence_image: [
          {
            id: 111,
            residence_id: 123,
            url: '/file/is/here',
            width: 600,
            height: 800,
          },
        ],
        residence_category: [
          {
            category: {
              id: 111,
              title: 'beach',
              fa_title: 'ساحلی',
            },
          },
        ],
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

    it("should return all residences where weekday_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_weekday_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { weekday_price: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where weekday_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_weekday_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { weekday_price: { gt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where weekend_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_weekend_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { weekend_price: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where weekend_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_weekend_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { weekend_price: { gt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where peak_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_peak_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { peak_price: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where peak_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_peak_price: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { peak_price: { gt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekday <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_extra_guest_weekday: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_weekday: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekday >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_extra_guest_weekday: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_weekday: { gt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekend <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_extra_guest_weekend: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_weekend: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekend >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_extra_guest_weekend: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_weekend: { gt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_peak <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[0]]);

      const dto: FilterResidenceDto = {
        max_extra_guest_peak: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[0]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_peak: { lt: 6 } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence.findMany).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_peak >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.findMany.mockResolvedValue([residences[1]]);

      const dto: FilterResidenceDto = {
        min_extra_guest_peak: '6',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residences[1]]);
      expect(prisma.residence.findMany).toBeCalledWith({
        select,
        where: { extra_guest_peak: { gt: 6 } },
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

    it("should return all residences where weekday_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_weekday_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { weekday_price: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where weekday_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_weekday_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { weekday_price: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where weekend_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_weekend_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { weekend_price: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where weekend_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_weekend_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { weekend_price: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where peak_price <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_peak_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { peak_price: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where peak_price >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_peak_price: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { peak_price: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekday <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_extra_guest_weekday: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_weekday: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekday >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_extra_guest_weekday: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_weekday: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekend <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_extra_guest_weekend: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_weekend: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_weekend >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_extra_guest_weekend: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_weekend: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_peak <= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        max_extra_guest_peak: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_peak: { lt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });

    it("should return all residences where extra_guest_peak >= '6'", async () => {
      // mock prisma return value
      PrismaMockService.residence.count.mockResolvedValue(1);

      const dto: FilterResidenceDto = {
        min_extra_guest_peak: '6',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence.count).toBeCalledWith({
        where: { extra_guest_peak: { gt: 6 } },
      });
      expect(prisma.residence.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Residence>', () => {
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
      normal_capacity: 2,
      max_capacity: 4,
      about: 'this is my residence',
      residence_price: {
        residence_id: 123,
        weekday_price: 5,
        weekend_price: 5,
        peak_price: 5,
        extra_guest_weekday: 5,
        extra_guest_weekend: 5,
        extra_guest_peak: 5,
      },
      residence_image: [
        {
          id: 111,
          residence_id: 123,
          url: '/file/is/here',
          width: 600,
          height: 800,
        },
      ],
      residence_category: [
        {
          category: {
            id: 111,
            title: 'beach',
            fa_title: 'ساحلی',
          },
        },
      ],
    };

    it('should return Residence by id', async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(residence);

      const result = await service.findOne(2);
      expect(result).toStrictEqual(residence);
      expect(prisma.residence.findUnique).toBeCalledWith({
        select,
        where: { id: 2 },
      });
      expect(prisma.residence.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence not found',
      );
    });
  });

  describe('async update(id: string, updateProvinceDto: UpdateProvinceDto): Promise<Province>', () => {
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
      normal_capacity: 2,
      max_capacity: 4,
      about: 'this is my residence',
      residence_price: {
        residence_id: 123,
        weekday_price: 5,
        weekend_price: 5,
        peak_price: 5,
        extra_guest_weekday: 5,
        extra_guest_weekend: 5,
        extra_guest_peak: 5,
      },
      residence_image: [
        {
          id: 111,
          residence_id: 123,
          url: '/file/is/here',
          width: 600,
          height: 800,
        },
      ],
      residence_category: [
        {
          category: {
            id: 111,
            title: 'beach',
            fa_title: 'ساحلی',
          },
        },
      ],
    };

    it('should update residence by id', async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(residence);
      PrismaMockService.residence.update.mockResolvedValue(residence);

      const result = await service.update(1, { title: 'ویلای من' }, 123);
      expect(result).toStrictEqual(residence);
      expect(prisma.residence.update).toBeCalledWith({
        select,
        data: {
          title: 'ویلای من',
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.residence.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(null);
      PrismaMockService.residence.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(
        service.update(1000, { title: 'ویلای من' }, 1234),
      ).rejects.toThrow('residence not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
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
      normal_capacity: 2,
      max_capacity: 4,
      about: 'this is my residence',
      residence_price: {
        residence_id: 123,
        weekday_price: 5,
        weekend_price: 5,
        peak_price: 5,
        extra_guest_weekday: 5,
        extra_guest_weekend: 5,
        extra_guest_peak: 5,
      },
      residence_image: [
        {
          id: 111,
          residence_id: 123,
          url: '/file/is/here',
          width: 600,
          height: 800,
        },
      ],
      residence_category: [
        {
          category: {
            id: 111,
            title: 'beach',
            fa_title: 'ساحلی',
          },
        },
      ],
    };

    it('should delete residence by id', async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(residence);
      PrismaMockService.residence.update.mockResolvedValue(residence);

      await service.remove(1, 123);
      expect(prisma.residence.update).toBeCalledWith({
        where: { id: 1 },
        data: {
          active: false,
        },
      });
      expect(prisma.residence.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(null);
      PrismaMockService.residence.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.remove(1000, 123)).rejects.toThrow(
        'residence not found',
      );
    });

    it("should throw if the host is not residence's host", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(residence);

      await expect(service.remove(1000, 1)).rejects.toThrow(
        "you don't have permission to do that",
      );
    });
  });

  describe('async checkHost(id: number, host_id: number): Promise<boolean>', () => {
    it('should return true if host_id is the host of residence', async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue({
        id: 2,
        host_id: 1,
      });

      const result = await service.checkHost(2, 1);
      expect(result).toEqual(true);
      expect(prisma.residence.findUnique).toBeCalledWith({
        select: {
          id: true,
          host_id: true,
        },
        where: { id: 2 },
      });
      expect(prisma.residence.findUnique).toBeCalledTimes(1);
    });

    it("should throw if host doesn't own residence", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue({
        id: 2,
        host_id: 222,
      });

      const result = await service.checkHost(2, 1);
      expect(result).toEqual(false);
      expect(prisma.residence.findUnique).toBeCalledWith({
        select: {
          id: true,
          host_id: true,
        },
        where: { id: 2 },
      });
      expect(prisma.residence.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence not found',
      );
    });
  });
});

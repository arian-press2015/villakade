import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidencePriceDto,
  FilterResidencePriceDto,
  ResidencePrice,
} from './dto';
import { ResidencePriceService } from './residencePrice.service';

const select = {
  residence_id: true,
  weekday_price: true,
  weekend_price: true,
  peak_price: true,
  extra_guest_weekday: true,
  extra_guest_weekend: true,
  extra_guest_peak: true,
};

describe('ResidencePriceService', () => {
  let service: ResidencePriceService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidencePriceService,
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

    service = module.get<ResidencePriceService>(ResidencePriceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidencePriceDto): Promise<ResidencePrice>', () => {
    const residence_price: ResidencePrice = {
      residence_id: 123,
      weekday_price: 123,
      weekend_price: 123,
      peak_price: 123,
      extra_guest_weekday: 123,
      extra_guest_weekend: 123,
      extra_guest_peak: 123,
    };

    it('should create new ResidencePrice and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.create.mockResolvedValue(
        residence_price,
      );

      const dto: CreateResidencePriceDto = {
        residence_id: 123,
        weekday_price: 123,
        weekend_price: 123,
        peak_price: 123,
        extra_guest_weekday: 123,
        extra_guest_weekend: 123,
        extra_guest_peak: 123,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_price);
      expect(prisma.residence_price.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_price.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidencePriceDto): Promise<ResidencePrice[]>', () => {
    const residence_prices = [
      {
        residence_id: 123,
        weekday_price: 123,
        weekend_price: 123,
        peak_price: 123,
        extra_guest_weekday: 123,
        extra_guest_weekend: 123,
        extra_guest_peak: 123,
      },
      {
        residence_id: 321,
        weekday_price: 321,
        weekend_price: 321,
        peak_price: 321,
        extra_guest_weekday: 321,
        extra_guest_weekend: 321,
        extra_guest_peak: 321,
      },
    ];

    it('should return all residence_prices', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findMany.mockResolvedValue(
        residence_prices,
      );

      const dto: FilterResidencePriceDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_prices);
      expect(prisma.residence_price.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_price.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_prices where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findMany.mockResolvedValue([
        residence_prices[0],
      ]);

      const dto: FilterResidencePriceDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_prices[0]]);
      expect(prisma.residence_price.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_price.findMany).toBeCalledTimes(1);
    });

    it('should return residence_prices based on limit', async () => {
      // mock prisma return value
      const mockData: ResidencePrice[] = [residence_prices[0]];
      PrismaMockService.residence_price.findMany.mockResolvedValue(mockData);

      const dto: FilterResidencePriceDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_price.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_price.findMany).toBeCalledTimes(1);
    });

    it('should return residence_prices based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findMany.mockResolvedValue([
        residence_prices[1],
      ]);

      const dto: FilterResidencePriceDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_prices[1]]);
      expect(prisma.residence_price.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_price.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_prices based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findMany.mockResolvedValue([
        residence_prices[1],
        residence_prices[0],
      ]);

      const dto: FilterResidencePriceDto = {
        sort: 'weekday_price:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_prices[1], residence_prices[0]]);
      expect(prisma.residence_price.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { weekday_price: 'desc' },
      });
      expect(prisma.residence_price.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidencePriceDto): Promise<number>', () => {
    it("should return residence_price count based on residence_id=='1'", async () => {
      // mock prisma return value
      PrismaMockService.residence_price.count.mockResolvedValue(1);

      const dto: FilterResidencePriceDto = {
        residence_id: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_price.count).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_price.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidencePrice>', () => {
    const residence_price = {
      residence_id: 123,
      weekday_price: 123,
      weekend_price: 123,
      peak_price: 123,
      extra_guest_weekday: 123,
      extra_guest_weekend: 123,
      extra_guest_peak: 123,
    };

    it('should return residence_price by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findUnique.mockResolvedValue(
        residence_price,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_price);
      expect(prisma.residence_price.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_price.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_price.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_price not found',
      );
    });
  });

  describe('async update(id: string, updateResidencePriceDto: UpdateResidencePriceDto): Promise<ResidencePrice>', () => {
    const residence_price = {
      residence_id: 123,
      weekday_price: 123,
      weekend_price: 123,
      peak_price: 123,
      extra_guest_weekday: 123,
      extra_guest_weekend: 123,
      extra_guest_peak: 123,
    };

    it('should update residence_price by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.update.mockResolvedValue(
        residence_price,
      );

      const result = await service.update(123, {
        extra_guest_peak: 123,
      });
      expect(result).toStrictEqual(residence_price);
      expect(prisma.residence_price.update).toBeCalledWith({
        select,
        data: {
          extra_guest_peak: 123,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_price.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_price.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(
        service.update(1000, { extra_guest_peak: 123 }),
      ).rejects.toThrow('residence_price not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_price = {
      residence_id: 123,
      weekday_price: 123,
      weekend_price: 123,
      peak_price: 123,
      extra_guest_weekday: 123,
      extra_guest_weekend: 123,
      extra_guest_peak: 123,
    };
    it('should delete residence_price by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_price.delete.mockResolvedValue(
        residence_price,
      );

      await service.remove(1);
      expect(prisma.residence_price.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_price.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_price.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_price not found',
      );
    });
  });
});

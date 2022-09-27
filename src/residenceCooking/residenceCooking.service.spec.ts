import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceCookingDto,
  FilterResidenceCookingDto,
  ResidenceCooking,
} from './dto';
import { ResidenceCookingService } from './residenceCooking.service';

const select = {
  residence_id: true,
  fridge: true,
  microwave: true,
  pan: true,
  pot: true,
  grill: true,
  skewer: true,
  oven: true,
  lighter: true,
};

describe('ResidenceCookingService', () => {
  let service: ResidenceCookingService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceCookingService,
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

    service = module.get<ResidenceCookingService>(ResidenceCookingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceCookingDto): Promise<ResidenceCooking>', () => {
    const residence_cooking_attribute: ResidenceCooking = {
      residence_id: 123,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: true,
      lighter: true,
    };

    it('should create new ResidenceCooking and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.create.mockResolvedValue(
        residence_cooking_attribute,
      );

      const dto: CreateResidenceCookingDto = {
        residence_id: 123,
        fridge: true,
        microwave: true,
        pan: true,
        pot: true,
        grill: true,
        skewer: true,
        oven: true,
        lighter: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_cooking_attribute);
      expect(prisma.residence_cooking_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_cooking_attribute.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceCookingDto): Promise<ResidenceCooking[]>', () => {
    const residence_cooking_attributes = [
      {
        residence_id: 123,
        fridge: true,
        microwave: true,
        pan: true,
        pot: true,
        grill: true,
        skewer: true,
        oven: true,
        lighter: true,
      },
      {
        residence_id: 321,
        fridge: false,
        microwave: false,
        pan: false,
        pot: false,
        grill: false,
        skewer: false,
        oven: false,
        lighter: false,
      },
    ];

    it('should return all residence_cooking_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findMany.mockResolvedValue(
        residence_cooking_attributes,
      );

      const dto: FilterResidenceCookingDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_cooking_attributes);
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_cooking_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findMany.mockResolvedValue([
        residence_cooking_attributes[0],
      ]);

      const dto: FilterResidenceCookingDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_cooking_attributes[0]]);
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_cooking_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceCooking[] = [residence_cooking_attributes[0]];
      PrismaMockService.residence_cooking_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceCookingDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_cooking_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findMany.mockResolvedValue([
        residence_cooking_attributes[1],
      ]);

      const dto: FilterResidenceCookingDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_cooking_attributes[1]]);
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_cooking_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findMany.mockResolvedValue([
        residence_cooking_attributes[1],
        residence_cooking_attributes[0],
      ]);

      const dto: FilterResidenceCookingDto = {
        sort: 'oven:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_cooking_attributes[1],
        residence_cooking_attributes[0],
      ]);
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { oven: 'asc' },
      });
      expect(prisma.residence_cooking_attribute.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceCookingDto): Promise<number>', () => {
    it("should return residence_cooking_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.count.mockResolvedValue(1);

      const dto: FilterResidenceCookingDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_cooking_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_cooking_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceCooking>', () => {
    const residence_cooking_attribute = {
      residence_id: 123,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: true,
      lighter: true,
    };
    it('should return residence_cooking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findUnique.mockResolvedValue(
        residence_cooking_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_cooking_attribute);
      expect(prisma.residence_cooking_attribute.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_cooking_attribute.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_cooking_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceCookingDto: UpdateResidenceCookingDto): Promise<ResidenceCooking>', () => {
    const residence_cooking_attribute = {
      residence_id: 123,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: false,
      lighter: true,
    };
    it('should update residence_cooking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.update.mockResolvedValue(
        residence_cooking_attribute,
      );

      const result = await service.update(123, {
        oven: false,
      });
      expect(result).toStrictEqual(residence_cooking_attribute);
      expect(prisma.residence_cooking_attribute.update).toBeCalledWith({
        select,
        data: {
          oven: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_cooking_attribute.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { oven: false })).rejects.toThrow(
        'residence_cooking_attribute not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_cooking_attribute = {
      residence_id: 123,
      fridge: true,
      microwave: true,
      pan: true,
      pot: true,
      grill: true,
      skewer: true,
      oven: true,
      lighter: true,
    };
    it('should delete residence_cooking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.delete.mockResolvedValue(
        residence_cooking_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_cooking_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_cooking_attribute.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_cooking_attribute.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_cooking_attribute not found',
      );
    });
  });
});

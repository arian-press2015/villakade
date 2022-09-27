import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceParkingDto,
  FilterResidenceParkingDto,
  ResidenceParking,
} from './dto';
import { ResidenceParkingService } from './residenceParking.service';

const select = {
  residence_id: true,
  roof: true,
  unroofed: true,
  public: true,
  free_space: true,
  capacity: true,
};

describe('ResidenceParkingService', () => {
  let service: ResidenceParkingService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceParkingService,
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

    service = module.get<ResidenceParkingService>(ResidenceParkingService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceParkingDto): Promise<ResidenceParking>', () => {
    const residence_parking_attribute: ResidenceParking = {
      residence_id: 123,
      roof: true,
      unroofed: true,
      public: true,
      free_space: true,
      capacity: 2,
    };

    it('should create new ResidenceParking and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.create.mockResolvedValue(
        residence_parking_attribute,
      );

      const dto: CreateResidenceParkingDto = {
        residence_id: 123,
        roof: true,
        unroofed: true,
        public: true,
        free_space: true,
        capacity: 2,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_parking_attribute);
      expect(prisma.residence_parking_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_parking_attribute.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceParkingDto): Promise<ResidenceParking[]>', () => {
    const residence_parking_attributes = [
      {
        residence_id: 123,
        roof: true,
        unroofed: true,
        public: true,
        free_space: true,
        capacity: 2,
      },
      {
        residence_id: 321,
        roof: true,
        unroofed: true,
        public: true,
        free_space: true,
        capacity: 4,
      },
    ];

    it('should return all residence_parking_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findMany.mockResolvedValue(
        residence_parking_attributes,
      );

      const dto: FilterResidenceParkingDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_parking_attributes);
      expect(prisma.residence_parking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_parking_attribute.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_parking_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findMany.mockResolvedValue([
        residence_parking_attributes[0],
      ]);

      const dto: FilterResidenceParkingDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_parking_attributes[0]]);
      expect(prisma.residence_parking_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_parking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_parking_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceParking[] = [residence_parking_attributes[0]];
      PrismaMockService.residence_parking_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceParkingDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_parking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_parking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_parking_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findMany.mockResolvedValue([
        residence_parking_attributes[1],
      ]);

      const dto: FilterResidenceParkingDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_parking_attributes[1]]);
      expect(prisma.residence_parking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_parking_attribute.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_parking_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findMany.mockResolvedValue([
        residence_parking_attributes[1],
        residence_parking_attributes[0],
      ]);

      const dto: FilterResidenceParkingDto = {
        sort: 'kettle:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_parking_attributes[1],
        residence_parking_attributes[0],
      ]);
      expect(prisma.residence_parking_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { kettle: 'asc' },
      });
      expect(prisma.residence_parking_attribute.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceParkingDto): Promise<number>', () => {
    it("should return residence_parking_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.count.mockResolvedValue(1);

      const dto: FilterResidenceParkingDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_parking_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_parking_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceParking>', () => {
    const residence_parking_attribute = {
      residence_id: 123,
      roof: true,
      unroofed: true,
      public: true,
      free_space: true,
      capacity: 2,
    };
    it('should return residence_parking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findUnique.mockResolvedValue(
        residence_parking_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_parking_attribute);
      expect(prisma.residence_parking_attribute.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_parking_attribute.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_parking_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceParkingDto: UpdateResidenceParkingDto): Promise<ResidenceParking>', () => {
    const residence_parking_attribute = {
      residence_id: 123,
      roof: true,
      unroofed: true,
      public: false,
      free_space: true,
      capacity: 2,
    };
    it('should update residence_parking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.update.mockResolvedValue(
        residence_parking_attribute,
      );

      const result = await service.update(123, {
        public: false,
      });
      expect(result).toStrictEqual(residence_parking_attribute);
      expect(prisma.residence_parking_attribute.update).toBeCalledWith({
        select,
        data: {
          public: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_parking_attribute.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { public: false })).rejects.toThrow(
        'residence_parking_attribute not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_parking_attribute = {
      residence_id: 123,
      roof: true,
      unroofed: true,
      public: true,
      free_space: true,
      capacity: 2,
    };
    it('should delete residence_parking_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.delete.mockResolvedValue(
        residence_parking_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_parking_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_parking_attribute.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_parking_attribute.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_parking_attribute not found',
      );
    });
  });
});

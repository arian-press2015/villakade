import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceWcBathroomDto,
  FilterResidenceWcBathroomDto,
  ResidenceWcBathroom,
} from './dto';
import { ResidenceWcBathroomService } from './residenceWcBathroom.service';

const select = {
  residence_id: true,
  location: true,
  local_wc: true,
  fix_wc: true,
  portable_wc: true,
  shower: true,
  jacuzzi: true,
  bathtub: true,
  soap: true,
  shampoo: true,
  shared_wc_bathroom: true,
};

describe('ResidenceWcBathroomService', () => {
  let service: ResidenceWcBathroomService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceWcBathroomService,
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

    service = module.get<ResidenceWcBathroomService>(
      ResidenceWcBathroomService,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceWcBathroomDto): Promise<ResidenceWcBathroom>', () => {
    const residence_wc_bathroom: ResidenceWcBathroom = {
      residence_id: 123,
      location: 'here',
      local_wc: true,
      fix_wc: true,
      portable_wc: true,
      shower: true,
      jacuzzi: true,
      bathtub: true,
      soap: true,
      shampoo: true,
      shared_wc_bathroom: true,
    };

    it('should create new ResidenceWcBathroom and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.create.mockResolvedValue(
        residence_wc_bathroom,
      );

      const dto: CreateResidenceWcBathroomDto = {
        residence_id: 123,
        location: 'here',
        local_wc: true,
        fix_wc: true,
        portable_wc: true,
        shower: true,
        jacuzzi: true,
        bathtub: true,
        soap: true,
        shampoo: true,
        shared_wc_bathroom: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_wc_bathroom);
      expect(prisma.residence_wc_bathroom.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_wc_bathroom.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceWcBathroomDto): Promise<ResidenceWcBathroom[]>', () => {
    const residence_wc_bathrooms = [
      {
        residence_id: 123,
        location: 'here',
        local_wc: true,
        fix_wc: true,
        portable_wc: true,
        shower: true,
        jacuzzi: true,
        bathtub: true,
        soap: true,
        shampoo: true,
        shared_wc_bathroom: true,
      },
      {
        residence_id: 321,
        location: 'here',
        local_wc: false,
        fix_wc: false,
        portable_wc: false,
        shower: false,
        jacuzzi: false,
        bathtub: false,
        soap: false,
        shampoo: false,
        shared_wc_bathroom: false,
      },
    ];

    it('should return all residence_wc_bathrooms', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findMany.mockResolvedValue(
        residence_wc_bathrooms,
      );

      const dto: FilterResidenceWcBathroomDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_wc_bathrooms);
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_wc_bathrooms where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findMany.mockResolvedValue([
        residence_wc_bathrooms[0],
      ]);

      const dto: FilterResidenceWcBathroomDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_wc_bathrooms[0]]);
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledTimes(1);
    });

    it('should return residence_wc_bathrooms based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceWcBathroom[] = [residence_wc_bathrooms[0]];
      PrismaMockService.residence_wc_bathroom.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceWcBathroomDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledTimes(1);
    });

    it('should return residence_wc_bathrooms based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findMany.mockResolvedValue([
        residence_wc_bathrooms[1],
      ]);

      const dto: FilterResidenceWcBathroomDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_wc_bathrooms[1]]);
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_wc_bathrooms based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findMany.mockResolvedValue([
        residence_wc_bathrooms[1],
        residence_wc_bathrooms[0],
      ]);

      const dto: FilterResidenceWcBathroomDto = {
        sort: 'soap:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_wc_bathrooms[1],
        residence_wc_bathrooms[0],
      ]);
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { soap: 'asc' },
      });
      expect(prisma.residence_wc_bathroom.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceWcBathroomDto): Promise<number>', () => {
    it("should return residence_wc_bathroom count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.count.mockResolvedValue(1);

      const dto: FilterResidenceWcBathroomDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_wc_bathroom.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_wc_bathroom.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceWcBathroom>', () => {
    const residence_wc_bathroom = {
      residence_id: 123,
      location: 'here',
      local_wc: true,
      fix_wc: true,
      portable_wc: true,
      shower: true,
      jacuzzi: true,
      bathtub: true,
      soap: true,
      shampoo: true,
      shared_wc_bathroom: true,
    };
    it('should return residence_wc_bathroom by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findUnique.mockResolvedValue(
        residence_wc_bathroom,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_wc_bathroom);
      expect(prisma.residence_wc_bathroom.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_wc_bathroom.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_wc_bathroom not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceWcBathroomDto: UpdateResidenceWcBathroomDto): Promise<ResidenceWcBathroom>', () => {
    const residence_wc_bathroom = {
      residence_id: 123,
      location: 'here',
      local_wc: true,
      fix_wc: true,
      portable_wc: true,
      shower: true,
      jacuzzi: true,
      bathtub: true,
      soap: false,
      shampoo: true,
      shared_wc_bathroom: true,
    };
    it('should update residence_wc_bathroom by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.update.mockResolvedValue(
        residence_wc_bathroom,
      );

      const result = await service.update(123, {
        soap: false,
      });
      expect(result).toStrictEqual(residence_wc_bathroom);
      expect(prisma.residence_wc_bathroom.update).toBeCalledWith({
        select,
        data: {
          soap: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_wc_bathroom.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { soap: false })).rejects.toThrow(
        'residence_wc_bathroom not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_wc_bathroom = {
      residence_id: 123,
      location: 'here',
      local_wc: true,
      fix_wc: true,
      portable_wc: true,
      shower: true,
      jacuzzi: true,
      bathtub: true,
      soap: true,
      shampoo: true,
      shared_wc_bathroom: true,
    };
    it('should delete residence_wc_bathroom by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.delete.mockResolvedValue(
        residence_wc_bathroom,
      );

      await service.remove(1);
      expect(prisma.residence_wc_bathroom.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_wc_bathroom.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_wc_bathroom.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_wc_bathroom not found',
      );
    });
  });
});

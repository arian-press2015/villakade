import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceRoomDto,
  FilterResidenceRoomDto,
  ResidenceRoom,
} from './dto';
import { ResidenceRoomService } from './residenceRoom.service';

const select = {
  residence_id: true,
  count: true,
  wall_closet: true,
  drawer: true,
  hanger: true,
  double_bed: true,
  single_bed: true,
  carpet: true,
  heating_system: true,
  cooling_system: true,
};

describe('ResidenceRoomService', () => {
  let service: ResidenceRoomService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceRoomService,
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

    service = module.get<ResidenceRoomService>(ResidenceRoomService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceRoomDto): Promise<ResidenceRoom>', () => {
    const residence_room_attribute: ResidenceRoom = {
      residence_id: 123,
      count: 2,
      wall_closet: true,
      drawer: true,
      hanger: true,
      double_bed: true,
      single_bed: true,
      carpet: true,
      heating_system: true,
      cooling_system: true,
    };

    it('should create new ResidenceRoom and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.create.mockResolvedValue(
        residence_room_attribute,
      );

      const dto: CreateResidenceRoomDto = {
        residence_id: 123,
        count: 2,
        wall_closet: true,
        drawer: true,
        hanger: true,
        double_bed: true,
        single_bed: true,
        carpet: true,
        heating_system: true,
        cooling_system: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_room_attribute);
      expect(prisma.residence_room_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_room_attribute.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceRoomDto): Promise<ResidenceRoom[]>', () => {
    const residence_room_attributes = [
      {
        residence_id: 123,
        count: 2,
        wall_closet: true,
        drawer: true,
        hanger: true,
        double_bed: true,
        single_bed: true,
        carpet: true,
        heating_system: true,
        cooling_system: true,
      },
      {
        residence_id: 321,
        count: 2,
        wall_closet: true,
        drawer: true,
        hanger: true,
        double_bed: true,
        single_bed: true,
        carpet: true,
        heating_system: true,
        cooling_system: true,
      },
    ];

    it('should return all residence_room_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findMany.mockResolvedValue(
        residence_room_attributes,
      );

      const dto: FilterResidenceRoomDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_room_attributes);
      expect(prisma.residence_room_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_room_attribute.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_room_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findMany.mockResolvedValue([
        residence_room_attributes[0],
      ]);

      const dto: FilterResidenceRoomDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_room_attributes[0]]);
      expect(prisma.residence_room_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_room_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_room_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceRoom[] = [residence_room_attributes[0]];
      PrismaMockService.residence_room_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceRoomDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_room_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_room_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_room_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findMany.mockResolvedValue([
        residence_room_attributes[1],
      ]);

      const dto: FilterResidenceRoomDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_room_attributes[1]]);
      expect(prisma.residence_room_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_room_attribute.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_room_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findMany.mockResolvedValue([
        residence_room_attributes[1],
        residence_room_attributes[0],
      ]);

      const dto: FilterResidenceRoomDto = {
        sort: 'kettle:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_room_attributes[1],
        residence_room_attributes[0],
      ]);
      expect(prisma.residence_room_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { kettle: 'asc' },
      });
      expect(prisma.residence_room_attribute.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceRoomDto): Promise<number>', () => {
    it("should return residence_room_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.count.mockResolvedValue(1);

      const dto: FilterResidenceRoomDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_room_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_room_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceRoom>', () => {
    const residence_room_attribute = {
      residence_id: 123,
      plate: true,
      fork_spoon: true,
      knife: true,
      bowl: true,
      glass: true,
      teapot: true,
      kettle: true,
      samovar: true,
      tea_maker: true,
      salt_shaker: true,
      tablecloth: true,
      dining_table: true,
      child_chair: true,
      tissue_paper: true,
    };
    it('should return residence_room_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findUnique.mockResolvedValue(
        residence_room_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_room_attribute);
      expect(prisma.residence_room_attribute.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_room_attribute.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_room_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceRoomDto: UpdateResidenceRoomDto): Promise<ResidenceRoom>', () => {
    const residence_room_attribute = {
      residence_id: 123,
      count: 2,
      wall_closet: true,
      drawer: true,
      hanger: true,
      double_bed: true,
      single_bed: true,
      carpet: false,
      heating_system: true,
      cooling_system: true,
    };
    it('should update residence_room_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.update.mockResolvedValue(
        residence_room_attribute,
      );

      const result = await service.update(123, {
        carpet: false,
      });
      expect(result).toStrictEqual(residence_room_attribute);
      expect(prisma.residence_room_attribute.update).toBeCalledWith({
        select,
        data: {
          carpet: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_room_attribute.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { carpet: false })).rejects.toThrow(
        'residence_room_attribute not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_room_attribute = {
      residence_id: 123,
      count: 2,
      wall_closet: true,
      drawer: true,
      hanger: true,
      double_bed: true,
      single_bed: true,
      carpet: true,
      heating_system: true,
      cooling_system: true,
    };
    it('should delete residence_room_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.delete.mockResolvedValue(
        residence_room_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_room_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_room_attribute.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_room_attribute.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_room_attribute not found',
      );
    });
  });
});

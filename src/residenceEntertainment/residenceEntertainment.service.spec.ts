import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceEntertainmentDto,
  FilterResidenceEntertainmentDto,
  ResidenceEntertainment,
} from './dto';
import { ResidenceEntertainmentService } from './residenceEntertainment.service';

const select = {
  residence_id: true,
  television: true,
  receiver: true,
  audio_system: true,
  swing: true,
  ping_pong: true,
  foosball: true,
  game_console: true,
  pool_table: true,
  game_board: true,
  treadmill: true,
  bicycle: true,
  beach_motor: true,
};

describe('ResidenceEntertainmentService', () => {
  let service: ResidenceEntertainmentService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceEntertainmentService,
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

    service = module.get<ResidenceEntertainmentService>(
      ResidenceEntertainmentService,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceEntertainmentDto): Promise<ResidenceEntertainment>', () => {
    const residence_entertainment_attribute: ResidenceEntertainment = {
      residence_id: 123,
      television: true,
      receiver: true,
      audio_system: true,
      swing: true,
      ping_pong: true,
      foosball: true,
      game_console: true,
      pool_table: true,
      game_board: true,
      treadmill: true,
      bicycle: true,
      beach_motor: true,
    };

    it('should create new ResidenceEntertainment and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.create.mockResolvedValue(
        residence_entertainment_attribute,
      );

      const dto: CreateResidenceEntertainmentDto = {
        residence_id: 123,
        television: true,
        receiver: true,
        audio_system: true,
        swing: true,
        ping_pong: true,
        foosball: true,
        game_console: true,
        pool_table: true,
        game_board: true,
        treadmill: true,
        bicycle: true,
        beach_motor: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_entertainment_attribute);
      expect(prisma.residence_entertainment_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_entertainment_attribute.create).toBeCalledTimes(
        1,
      );
    });
  });

  describe('async findAll(dto: FilterResidenceEntertainmentDto): Promise<ResidenceEntertainment[]>', () => {
    const residence_entertainment_attributes = [
      {
        residence_id: 123,
        television: true,
        receiver: true,
        audio_system: true,
        swing: true,
        ping_pong: true,
        foosball: true,
        game_console: true,
        pool_table: true,
        game_board: true,
        treadmill: true,
        bicycle: true,
        beach_motor: true,
      },
      {
        residence_id: 321,
        television: false,
        receiver: false,
        audio_system: false,
        swing: false,
        ping_pong: false,
        foosball: false,
        game_console: false,
        pool_table: false,
        game_board: false,
        treadmill: false,
        bicycle: false,
        beach_motor: false,
      },
    ];

    it('should return all residence_entertainment_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findMany.mockResolvedValue(
        residence_entertainment_attributes,
      );

      const dto: FilterResidenceEntertainmentDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_entertainment_attributes);
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledTimes(
        1,
      );
    });

    it("should return all residence_entertainment_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findMany.mockResolvedValue(
        [residence_entertainment_attributes[0]],
      );

      const dto: FilterResidenceEntertainmentDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_entertainment_attributes[0]]);
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledTimes(
        1,
      );
    });

    it('should return residence_entertainment_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceEntertainment[] = [
        residence_entertainment_attributes[0],
      ];
      PrismaMockService.residence_entertainment_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceEntertainmentDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledTimes(
        1,
      );
    });

    it('should return residence_entertainment_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findMany.mockResolvedValue(
        [residence_entertainment_attributes[1]],
      );

      const dto: FilterResidenceEntertainmentDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_entertainment_attributes[1]]);
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledTimes(
        1,
      );
    });

    it('should sort residence_entertainment_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findMany.mockResolvedValue(
        [
          residence_entertainment_attributes[1],
          residence_entertainment_attributes[0],
        ],
      );

      const dto: FilterResidenceEntertainmentDto = {
        sort: 'game_console:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_entertainment_attributes[1],
        residence_entertainment_attributes[0],
      ]);
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { game_console: 'asc' },
      });
      expect(prisma.residence_entertainment_attribute.findMany).toBeCalledTimes(
        1,
      );
    });
  });

  describe('async getCount(dto: FilterResidenceEntertainmentDto): Promise<number>', () => {
    it("should return residence_entertainment_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.count.mockResolvedValue(
        1,
      );

      const dto: FilterResidenceEntertainmentDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_entertainment_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_entertainment_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceEntertainment>', () => {
    const residence_entertainment_attribute = {
      residence_id: 123,
      television: true,
      receiver: true,
      audio_system: true,
      swing: true,
      ping_pong: true,
      foosball: true,
      game_console: true,
      pool_table: true,
      game_board: true,
      treadmill: true,
      bicycle: true,
      beach_motor: true,
    };
    it('should return residence_entertainment_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findUnique.mockResolvedValue(
        residence_entertainment_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_entertainment_attribute);
      expect(
        prisma.residence_entertainment_attribute.findUnique,
      ).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(
        prisma.residence_entertainment_attribute.findUnique,
      ).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_entertainment_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceEntertainmentDto: UpdateResidenceEntertainmentDto): Promise<ResidenceEntertainment>', () => {
    const residence_entertainment_attribute = {
      residence_id: 123,
      television: true,
      receiver: true,
      audio_system: true,
      swing: true,
      ping_pong: true,
      foosball: true,
      game_console: true,
      pool_table: true,
      game_board: true,
      treadmill: true,
      bicycle: true,
      beach_motor: true,
    };
    it('should update residence_entertainment_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.update.mockResolvedValue(
        residence_entertainment_attribute,
      );

      const result = await service.update(123, {
        game_console: false,
      });
      expect(result).toStrictEqual(residence_entertainment_attribute);
      expect(prisma.residence_entertainment_attribute.update).toBeCalledWith({
        select,
        data: {
          game_console: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_entertainment_attribute.update).toBeCalledTimes(
        1,
      );
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.update.mockRejectedValue(
        {
          code: 'P2025',
          meta: { cause: 'Record to update not found.' },
        },
      );

      await expect(
        service.update(1000, { game_console: false }),
      ).rejects.toThrow('residence_entertainment_attribute not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_entertainment_attribute = {
      residence_id: 123,
      television: true,
      receiver: true,
      audio_system: true,
      swing: true,
      ping_pong: true,
      foosball: true,
      game_console: true,
      pool_table: true,
      game_board: true,
      treadmill: true,
      bicycle: true,
      beach_motor: true,
    };
    it('should delete residence_entertainment_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.delete.mockResolvedValue(
        residence_entertainment_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_entertainment_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_entertainment_attribute.delete).toBeCalledTimes(
        1,
      );
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_entertainment_attribute.delete.mockRejectedValue(
        {
          code: 'P2025',
          meta: { cause: 'Record to delete does not exist.' },
        },
      );

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_entertainment_attribute not found',
      );
    });
  });
});

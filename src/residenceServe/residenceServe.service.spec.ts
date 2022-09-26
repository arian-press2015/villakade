import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceServeDto,
  FilterResidenceServeDto,
  ResidenceServe,
} from './dto';
import { ResidenceServeService } from './residenceServe.service';

const select = {
  residence_id: true,
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

describe('ResidenceServeService', () => {
  let service: ResidenceServeService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceServeService,
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

    service = module.get<ResidenceServeService>(ResidenceServeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceServeDto): Promise<ResidenceServe>', () => {
    const residence_serve_attribute: ResidenceServe = {
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

    it('should create new ResidenceServe and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.create.mockResolvedValue(
        residence_serve_attribute,
      );

      const dto: CreateResidenceServeDto = {
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

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_serve_attribute);
      expect(prisma.residence_serve_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_serve_attribute.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceServeDto): Promise<ResidenceServe[]>', () => {
    const residence_serve_attributes = [
      {
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
      },
      {
        residence_id: 321,
        plate: false,
        fork_spoon: false,
        knife: false,
        bowl: false,
        glass: false,
        teapot: false,
        kettle: false,
        samovar: false,
        tea_maker: false,
        salt_shaker: false,
        tablecloth: false,
        dining_table: false,
        child_chair: false,
        tissue_paper: false,
      },
    ];

    it('should return all residence_serve_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findMany.mockResolvedValue(
        residence_serve_attributes,
      );

      const dto: FilterResidenceServeDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_serve_attributes);
      expect(prisma.residence_serve_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_serve_attribute.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_serve_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findMany.mockResolvedValue([
        residence_serve_attributes[0],
      ]);

      const dto: FilterResidenceServeDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_serve_attributes[0]]);
      expect(prisma.residence_serve_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_serve_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_serve_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceServe[] = [residence_serve_attributes[0]];
      PrismaMockService.residence_serve_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceServeDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_serve_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_serve_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_serve_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findMany.mockResolvedValue([
        residence_serve_attributes[1],
      ]);

      const dto: FilterResidenceServeDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_serve_attributes[1]]);
      expect(prisma.residence_serve_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_serve_attribute.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_serve_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findMany.mockResolvedValue([
        residence_serve_attributes[1],
        residence_serve_attributes[0],
      ]);

      const dto: FilterResidenceServeDto = {
        sort: 'kettle:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_serve_attributes[1],
        residence_serve_attributes[0],
      ]);
      expect(prisma.residence_serve_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { kettle: 'asc' },
      });
      expect(prisma.residence_serve_attribute.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceServeDto): Promise<number>', () => {
    it("should return residence_serve_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.count.mockResolvedValue(1);

      const dto: FilterResidenceServeDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_serve_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_serve_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceServe>', () => {
    const residence_serve_attribute = {
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
    it('should return residence_serve_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findUnique.mockResolvedValue(
        residence_serve_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_serve_attribute);
      expect(prisma.residence_serve_attribute.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_serve_attribute.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_serve_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceServeDto: UpdateResidenceServeDto): Promise<ResidenceServe>', () => {
    const residence_serve_attribute = {
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
    it('should update residence_serve_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.update.mockResolvedValue(
        residence_serve_attribute,
      );

      const result = await service.update(123, {
        kettle: false,
      });
      expect(result).toStrictEqual(residence_serve_attribute);
      expect(prisma.residence_serve_attribute.update).toBeCalledWith({
        select,
        data: {
          kettle: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_serve_attribute.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { kettle: false })).rejects.toThrow(
        'residence_serve_attribute not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_serve_attribute = {
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
    it('should delete residence_serve_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.delete.mockResolvedValue(
        residence_serve_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_serve_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_serve_attribute.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_serve_attribute.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_serve_attribute not found',
      );
    });
  });
});

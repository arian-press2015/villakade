import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceAirConditioningDto,
  FilterResidenceAirConditioningDto,
  ResidenceAirConditioning,
} from './dto';
import { ResidenceAirConditioningService } from './residenceAirConditioning.service';

const select = {
  residence_id: true,
  radiator: true,
  wood_heater: true,
  fireplace: true,
  korsi: true,
  oil_heater: true,
  fancoil: true,
  electric_heater: true,
  air_conditioner: true,
  water_cooler: true,
  split: true,
  ceiling_fan: true,
  standing_fan: true,
};

describe('ResidenceAirConditioningService', () => {
  let service: ResidenceAirConditioningService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceAirConditioningService,
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

    service = module.get<ResidenceAirConditioningService>(
      ResidenceAirConditioningService,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceAirConditioningDto): Promise<ResidenceAirConditioning>', () => {
    const residence_air_conditioning_attribute: ResidenceAirConditioning = {
      residence_id: 123,
      radiator: true,
      wood_heater: true,
      fireplace: true,
      korsi: true,
      oil_heater: true,
      fancoil: true,
      electric_heater: true,
      air_conditioner: true,
      water_cooler: true,
      split: true,
      ceiling_fan: true,
      standing_fan: true,
    };

    it('should create new ResidenceAirConditioning and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.create.mockResolvedValue(
        residence_air_conditioning_attribute,
      );

      const dto: CreateResidenceAirConditioningDto = {
        residence_id: 123,
        radiator: true,
        wood_heater: true,
        fireplace: true,
        korsi: true,
        oil_heater: true,
        fancoil: true,
        electric_heater: true,
        air_conditioner: true,
        water_cooler: true,
        split: true,
        ceiling_fan: true,
        standing_fan: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_air_conditioning_attribute);
      expect(prisma.residence_air_conditioning_attribute.create).toBeCalledWith(
        {
          select,
          data: dto,
        },
      );
      expect(
        prisma.residence_air_conditioning_attribute.create,
      ).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceAirConditioningDto): Promise<ResidenceAirConditioning[]>', () => {
    const residence_air_conditioning_attributes = [
      {
        residence_id: 123,
        radiator: true,
        wood_heater: true,
        fireplace: true,
        korsi: true,
        oil_heater: true,
        fancoil: true,
        electric_heater: true,
        air_conditioner: true,
        water_cooler: true,
        split: true,
        ceiling_fan: true,
        standing_fan: true,
      },
      {
        residence_id: 321,
        radiator: false,
        wood_heater: false,
        fireplace: false,
        korsi: false,
        oil_heater: false,
        fancoil: false,
        electric_heater: false,
        air_conditioner: false,
        water_cooler: false,
        split: false,
        ceiling_fan: false,
        standing_fan: false,
      },
    ];

    it('should return all residence_air_conditioning_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findMany.mockResolvedValue(
        residence_air_conditioning_attributes,
      );

      const dto: FilterResidenceAirConditioningDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_air_conditioning_attributes);
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledTimes(1);
    });

    it("should return all residence_air_conditioning_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findMany.mockResolvedValue(
        [residence_air_conditioning_attributes[0]],
      );

      const dto: FilterResidenceAirConditioningDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_air_conditioning_attributes[0]]);
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledTimes(1);
    });

    it('should return residence_air_conditioning_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceAirConditioning[] = [
        residence_air_conditioning_attributes[0],
      ];
      PrismaMockService.residence_air_conditioning_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceAirConditioningDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledTimes(1);
    });

    it('should return residence_air_conditioning_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findMany.mockResolvedValue(
        [residence_air_conditioning_attributes[1]],
      );

      const dto: FilterResidenceAirConditioningDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_air_conditioning_attributes[1]]);
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledTimes(1);
    });

    it('should sort residence_air_conditioning_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findMany.mockResolvedValue(
        [
          residence_air_conditioning_attributes[1],
          residence_air_conditioning_attributes[0],
        ],
      );

      const dto: FilterResidenceAirConditioningDto = {
        sort: 'electric_heater:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_air_conditioning_attributes[1],
        residence_air_conditioning_attributes[0],
      ]);
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { electric_heater: 'asc' },
      });
      expect(
        prisma.residence_air_conditioning_attribute.findMany,
      ).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceAirConditioningDto): Promise<number>', () => {
    it("should return residence_air_conditioning_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.count.mockResolvedValue(
        1,
      );

      const dto: FilterResidenceAirConditioningDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_air_conditioning_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_air_conditioning_attribute.count).toBeCalledTimes(
        1,
      );
    });
  });

  describe('async findOne(id: string): Promise<ResidenceAirConditioning>', () => {
    const residence_air_conditioning_attribute = {
      residence_id: 123,
      radiator: true,
      wood_heater: true,
      fireplace: true,
      korsi: true,
      oil_heater: true,
      fancoil: true,
      electric_heater: true,
      air_conditioner: true,
      water_cooler: true,
      split: true,
      ceiling_fan: true,
      standing_fan: true,
    };
    it('should return residence_air_conditioning_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findUnique.mockResolvedValue(
        residence_air_conditioning_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_air_conditioning_attribute);
      expect(
        prisma.residence_air_conditioning_attribute.findUnique,
      ).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(
        prisma.residence_air_conditioning_attribute.findUnique,
      ).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_air_conditioning_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceAirConditioningDto: UpdateResidenceAirConditioningDto): Promise<ResidenceAirConditioning>', () => {
    const residence_air_conditioning_attribute = {
      residence_id: 123,
      radiator: true,
      wood_heater: true,
      fireplace: true,
      korsi: true,
      oil_heater: true,
      fancoil: true,
      electric_heater: false,
      air_conditioner: true,
      water_cooler: true,
      split: true,
      ceiling_fan: true,
      standing_fan: true,
    };
    it('should update residence_air_conditioning_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.update.mockResolvedValue(
        residence_air_conditioning_attribute,
      );

      const result = await service.update(123, {
        electric_heater: false,
      });
      expect(result).toStrictEqual(residence_air_conditioning_attribute);
      expect(prisma.residence_air_conditioning_attribute.update).toBeCalledWith(
        {
          select,
          data: {
            electric_heater: false,
          },
          where: {
            residence_id: 123,
          },
        },
      );
      expect(
        prisma.residence_air_conditioning_attribute.update,
      ).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.update.mockRejectedValue(
        {
          code: 'P2025',
          meta: { cause: 'Record to update not found.' },
        },
      );

      await expect(
        service.update(1000, { electric_heater: false }),
      ).rejects.toThrow('residence_air_conditioning_attribute not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_air_conditioning_attribute = {
      residence_id: 123,
      radiator: true,
      wood_heater: true,
      fireplace: true,
      korsi: true,
      oil_heater: true,
      fancoil: true,
      electric_heater: true,
      air_conditioner: true,
      water_cooler: true,
      split: true,
      ceiling_fan: true,
      standing_fan: true,
      child_chair: true,
      tissue_paper: true,
    };
    it('should delete residence_air_conditioning_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.delete.mockResolvedValue(
        residence_air_conditioning_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_air_conditioning_attribute.delete).toBeCalledWith(
        {
          where: { residence_id: 1 },
        },
      );
      expect(
        prisma.residence_air_conditioning_attribute.delete,
      ).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_air_conditioning_attribute.delete.mockRejectedValue(
        {
          code: 'P2025',
          meta: { cause: 'Record to delete does not exist.' },
        },
      );

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_air_conditioning_attribute not found',
      );
    });
  });
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceFacilityDto,
  FilterResidenceFacilityDto,
  ResidenceFacility,
} from './dto';
import { ResidenceFacilityService } from './residenceFacility.service';

const select = {
  residence_id: true,
  furniture: true,
  vacuum_cleaner: true,
  washing_machine: true,
  washing_powder: true,
  dishwashing_machine: true,
  wifi: true,
  hairdryer: true,
  elevator: true,
  iron: true,
  telephone: true,
  first_aid_kit: true,
  security_camera: true,
};

describe('ResidenceFacilityService', () => {
  let service: ResidenceFacilityService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceFacilityService,
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

    service = module.get<ResidenceFacilityService>(ResidenceFacilityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceFacilityDto): Promise<ResidenceFacility>', () => {
    const residence_facility_attribute: ResidenceFacility = {
      residence_id: 123,
      furniture: true,
      vacuum_cleaner: true,
      washing_machine: true,
      washing_powder: true,
      dishwashing_machine: true,
      wifi: true,
      hairdryer: true,
      elevator: true,
      iron: true,
      telephone: true,
      first_aid_kit: true,
      security_camera: true,
    };

    it('should create new ResidenceFacility and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.create.mockResolvedValue(
        residence_facility_attribute,
      );

      const dto: CreateResidenceFacilityDto = {
        residence_id: 123,
        furniture: true,
        vacuum_cleaner: true,
        washing_machine: true,
        washing_powder: true,
        dishwashing_machine: true,
        wifi: true,
        hairdryer: true,
        elevator: true,
        iron: true,
        telephone: true,
        first_aid_kit: true,
        security_camera: true,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_facility_attribute);
      expect(prisma.residence_facility_attribute.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_facility_attribute.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceFacilityDto): Promise<ResidenceFacility[]>', () => {
    const residence_facility_attributes = [
      {
        residence_id: 123,
        furniture: true,
        vacuum_cleaner: true,
        washing_machine: true,
        washing_powder: true,
        dishwashing_machine: true,
        wifi: true,
        hairdryer: true,
        elevator: true,
        iron: true,
        telephone: true,
        first_aid_kit: true,
        security_camera: true,
      },
      {
        residence_id: 321,
        furniture: false,
        vacuum_cleaner: false,
        washing_machine: false,
        washing_powder: false,
        dishwashing_machine: false,
        wifi: false,
        hairdryer: false,
        elevator: false,
        iron: false,
        telephone: false,
        first_aid_kit: false,
        security_camera: false,
      },
    ];

    it('should return all residence_facility_attributes', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findMany.mockResolvedValue(
        residence_facility_attributes,
      );

      const dto: FilterResidenceFacilityDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_facility_attributes);
      expect(prisma.residence_facility_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_facility_attribute.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_facility_attributes where residence_id === '123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findMany.mockResolvedValue(
        [residence_facility_attributes[0]],
      );

      const dto: FilterResidenceFacilityDto = {
        residence_id: '123',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_facility_attributes[0]]);
      expect(prisma.residence_facility_attribute.findMany).toBeCalledWith({
        select,
        where: { residence_id: 123 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_facility_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_facility_attributes based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceFacility[] = [residence_facility_attributes[0]];
      PrismaMockService.residence_facility_attribute.findMany.mockResolvedValue(
        mockData,
      );

      const dto: FilterResidenceFacilityDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_facility_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_facility_attribute.findMany).toBeCalledTimes(1);
    });

    it('should return residence_facility_attributes based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findMany.mockResolvedValue(
        [residence_facility_attributes[1]],
      );

      const dto: FilterResidenceFacilityDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_facility_attributes[1]]);
      expect(prisma.residence_facility_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_facility_attribute.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_facility_attributes based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findMany.mockResolvedValue(
        [residence_facility_attributes[1], residence_facility_attributes[0]],
      );

      const dto: FilterResidenceFacilityDto = {
        sort: 'hairdryer:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([
        residence_facility_attributes[1],
        residence_facility_attributes[0],
      ]);
      expect(prisma.residence_facility_attribute.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { hairdryer: 'asc' },
      });
      expect(prisma.residence_facility_attribute.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceFacilityDto): Promise<number>', () => {
    it("should return residence_facility_attribute count based on residence_id=='123'", async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.count.mockResolvedValue(1);

      const dto: FilterResidenceFacilityDto = {
        residence_id: '123',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_facility_attribute.count).toBeCalledWith({
        where: { residence_id: 123 },
      });
      expect(prisma.residence_facility_attribute.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceFacility>', () => {
    const residence_facility_attribute = {
      residence_id: 123,
      furniture: true,
      vacuum_cleaner: true,
      washing_machine: true,
      washing_powder: true,
      dishwashing_machine: true,
      wifi: true,
      hairdryer: true,
      elevator: true,
      iron: true,
      telephone: true,
      first_aid_kit: true,
      security_camera: true,
    };
    it('should return residence_facility_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findUnique.mockResolvedValue(
        residence_facility_attribute,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_facility_attribute);
      expect(prisma.residence_facility_attribute.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_facility_attribute.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.findUnique.mockResolvedValue(
        null,
      );

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_facility_attribute not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceFacilityDto: UpdateResidenceFacilityDto): Promise<ResidenceFacility>', () => {
    const residence_facility_attribute = {
      residence_id: 123,
      furniture: true,
      vacuum_cleaner: true,
      washing_machine: true,
      washing_powder: true,
      dishwashing_machine: true,
      wifi: true,
      hairdryer: true,
      elevator: true,
      iron: true,
      telephone: true,
      first_aid_kit: true,
      security_camera: true,
    };
    it('should update residence_facility_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.update.mockResolvedValue(
        residence_facility_attribute,
      );

      const result = await service.update(123, {
        hairdryer: false,
      });
      expect(result).toStrictEqual(residence_facility_attribute);
      expect(prisma.residence_facility_attribute.update).toBeCalledWith({
        select,
        data: {
          hairdryer: false,
        },
        where: {
          residence_id: 123,
        },
      });
      expect(prisma.residence_facility_attribute.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { hairdryer: false })).rejects.toThrow(
        'residence_facility_attribute not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_facility_attribute = {
      residence_id: 123,
      furniture: true,
      vacuum_cleaner: true,
      washing_machine: true,
      washing_powder: true,
      dishwashing_machine: true,
      wifi: true,
      hairdryer: true,
      elevator: true,
      iron: true,
      telephone: true,
      first_aid_kit: true,
      security_camera: true,
      child_chair: true,
      tissue_paper: true,
    };
    it('should delete residence_facility_attribute by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.delete.mockResolvedValue(
        residence_facility_attribute,
      );

      await service.remove(1);
      expect(prisma.residence_facility_attribute.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_facility_attribute.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_facility_attribute.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_facility_attribute not found',
      );
    });
  });
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceRuleDto,
  FilterResidenceRuleDto,
  ResidenceRule,
} from './dto';
import { ResidenceRuleService } from './residenceRule.service';

const select = {
  residence_id: true,
  rule_body: true,
};

describe('ResidenceRuleService', () => {
  let service: ResidenceRuleService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceRuleService,
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

    service = module.get<ResidenceRuleService>(ResidenceRuleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceRuleDto): Promise<ResidenceRule>', () => {
    const residence_rule: ResidenceRule = {
      residence_id: 1,
      rule_body: 'خونه را کثیف نکنین',
    };

    it('should create new ResidenceRule and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.create.mockResolvedValue(residence_rule);

      const dto: CreateResidenceRuleDto = {
        residence_id: 1,
        rule_body: 'خونه را کثیف نکنین',
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence_rule);
      expect(prisma.residence_rule.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.residence_rule.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceRuleDto): Promise<ResidenceRule[]>', () => {
    const residence_rules = [
      {
        residence_id: 1,
        rule_body: 'خونه را کثیف نکنین',
      },
      {
        residence_id: 2,
        rule_body: 'خونه منو را کثیف نکنین',
      },
    ];

    it('should return all residence_rules', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findMany.mockResolvedValue(
        residence_rules,
      );

      const dto: FilterResidenceRuleDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residence_rules);
      expect(prisma.residence_rule.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_rule.findMany).toBeCalledTimes(1);
    });

    it("should return all residence_rules where residence_id === '1'", async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findMany.mockResolvedValue([
        residence_rules[0],
      ]);

      const dto: FilterResidenceRuleDto = {
        residence_id: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_rules[0]]);
      expect(prisma.residence_rule.findMany).toBeCalledWith({
        select,
        where: { residence_id: 1 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_rule.findMany).toBeCalledTimes(1);
    });

    it('should return residence_rules based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceRule[] = [residence_rules[0]];
      PrismaMockService.residence_rule.findMany.mockResolvedValue(mockData);

      const dto: FilterResidenceRuleDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_rule.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_rule.findMany).toBeCalledTimes(1);
    });

    it('should return residence_rules based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findMany.mockResolvedValue([
        residence_rules[1],
      ]);

      const dto: FilterResidenceRuleDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_rules[1]]);
      expect(prisma.residence_rule.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_rule.findMany).toBeCalledTimes(1);
    });

    it('should sort residence_rules based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findMany.mockResolvedValue([
        residence_rules[1],
        residence_rules[0],
      ]);

      const dto: FilterResidenceRuleDto = {
        sort: 'full_name:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residence_rules[1], residence_rules[0]]);
      expect(prisma.residence_rule.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { full_name: 'desc' },
      });
      expect(prisma.residence_rule.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceRuleDto): Promise<number>', () => {
    it("should return residence_rule count based on residence_id=='1'", async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.count.mockResolvedValue(1);

      const dto: FilterResidenceRuleDto = {
        residence_id: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_rule.count).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_rule.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceRule>', () => {
    const residence_rule = {
      residence_id: 1,
      rule_body: 'خونه را کثیف نکنین',
    };
    it('should return residence_rule by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findUnique.mockResolvedValue(
        residence_rule,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residence_rule);
      expect(prisma.residence_rule.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_rule.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'residence_rule not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceRuleDto: UpdateResidenceRuleDto): Promise<ResidenceRule>', () => {
    const residence_rule = {
      residence_id: 1,
      rule_body: 'خونه را کثیف نکنین',
    };
    it('should update residence_rule by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.update.mockResolvedValue(residence_rule);

      const result = await service.update(1, {
        rule_body: 'خونه را کثیف نکنین',
      });
      expect(result).toStrictEqual(residence_rule);
      expect(prisma.residence_rule.update).toBeCalledWith({
        select,
        data: {
          rule_body: 'خونه را کثیف نکنین',
        },
        where: {
          residence_id: 1,
        },
      });
      expect(prisma.residence_rule.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(
        service.update(1000, { rule_body: 'خونه را کثیف نکنین' }),
      ).rejects.toThrow('residence_rule not found');
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const residence_rule = {
      residence_id: 1,
      rule_body: 'خونه را کثیف نکنین',
    };
    it('should delete residence_rule by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.delete.mockResolvedValue(residence_rule);

      await service.remove(1);
      expect(prisma.residence_rule.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_rule.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_rule.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residence_rule not found',
      );
    });
  });
});

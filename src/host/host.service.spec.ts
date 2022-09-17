import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { totp } from 'otplib';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { RedisService } from '../shared/services/redis.service';
import { CreateHostDto, FilterHostDto, Host } from './dto';
import { HostService } from './host.service';

const select = {
  id: true,
  first_name: true,
  last_name: true,
  phone: true,
  vip: true,
  active: true,
};

describe('HostService', () => {
  let service: HostService;
  let redis: RedisService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HostService,
        RedisService,
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

    service = module.get<HostService>(HostService);
    redis = module.get<RedisService>(RedisService);
    prisma = module.get<PrismaService>(PrismaService);
    await redis.onModuleInit();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await redis.onModuleDestroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async getOtp(dto: HostOtpRequest): Promise<void>', () => {
    it('should generate and send otp if phone belongs to a host', async () => {
      const redisMock = jest.spyOn(redis, 'set');
      const otpMock = jest
        .spyOn(totp, 'generate')
        .mockImplementation(() => '123456');

      await service.getOtp({ phone: '+989012883045' });
      expect(redisMock).toBeCalledTimes(1);
      expect(otpMock).toBeCalledTimes(1);
    });
  });

  describe('async create(dto: CreateHostDto): Promise<Host>', () => {
    const host: Host = {
      id: 1,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      vip: false,
      active: false,
    };

    it('should create new Host and return it', async () => {
      // mock prisma return value
      PrismaMockService.host.create.mockResolvedValue(host);

      const dto: CreateHostDto = {
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        vip: true,
        active: true,
      };

      const { active, vip, ...data } = dto;
      const result = await service.create(dto);
      expect(result).toStrictEqual(host);
      expect(prisma.host.create).toBeCalledWith({
        select,
        data: { active: false, vip: false, ...data },
      });
      expect(prisma.host.create).toBeCalledTimes(1);
    });

    it('should throw if phone is used before', async () => {
      // mock prisma return value
      PrismaMockService.host.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'host_phone_UN' },
      });

      const dto: CreateHostDto = {
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        vip: true,
        active: true,
      };

      await expect(service.create(dto)).rejects.toThrow('phone already exists');
    });
  });

  describe('async findAll(dto: FilterHostDto): Promise<Host[]>', () => {
    const hosts = [
      {
        id: 1,
        first_name: 'arian',
        last_name: 'press2015',
        phone: '+989012883045',
        vip: true,
        active: true,
      },
      {
        id: 2,
        first_name: 'sepehran',
        last_name: 'babaei',
        phone: '+0989132233694',
        vip: false,
        active: false,
      },
    ];

    it('should return all hosts', async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue(hosts);

      const dto: FilterHostDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(hosts);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it("should return all hosts where first_name === 'ar'", async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[0]]);

      const dto: FilterHostDto = {
        first_name: 'ar',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[0]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: { first_name: { contains: 'ar' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it("should return all hosts where last_name === 'pre'", async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[0]]);

      const dto: FilterHostDto = {
        last_name: 'pre',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[0]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: { last_name: { contains: 'pre' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it("should return all hosts where phone === '45'", async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[0]]);

      const dto: FilterHostDto = {
        phone: '45',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[0]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: { phone: { contains: '45' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it("should return all hosts where active === 'true'", async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[0]]);

      const dto: FilterHostDto = {
        active: 'true',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[0]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: { active: true },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it("should return all hosts where vip === 'false'", async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[1]]);

      const dto: FilterHostDto = {
        vip: 'false',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[1]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: { vip: false },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it('should return hosts based on limit', async () => {
      // mock prisma return value
      const mockData: Host[] = [hosts[0]];
      PrismaMockService.host.findMany.mockResolvedValue(mockData);

      const dto: FilterHostDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it('should return hosts based on offset', async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[1]]);

      const dto: FilterHostDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[1]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });

    it('should sort hosts based on sort', async () => {
      // mock prisma return value
      PrismaMockService.host.findMany.mockResolvedValue([hosts[1], hosts[0]]);

      const dto: FilterHostDto = {
        sort: 'full_name:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([hosts[1], hosts[0]]);
      expect(prisma.host.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { full_name: 'desc' },
      });
      expect(prisma.host.findMany).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Host>', () => {
    const host = {
      id: 1,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      vip: false,
      active: false,
    };
    it('should return host by id', async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(host);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(host);
      expect(prisma.host.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.host.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('host not found');
    });
  });

  describe('async findByPhone(id: string): Promise<Host>', () => {
    const host = {
      id: 1,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      vip: false,
      active: false,
    };
    it('should return host by phone', async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(host);

      const result = await service.findByPhone('+989012883045');
      expect(result).toStrictEqual(host);
      expect(prisma.host.findUnique).toBeCalledWith({
        select,
        where: { phone: '+989012883045' },
      });
      expect(prisma.host.findUnique).toBeCalledTimes(1);
    });

    it("should return null if phone doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(null);

      await expect(service.findByPhone('+989992883045')).resolves.toEqual(null);
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const host = {
      id: 1,
      first_name: 'arian',
      last_name: 'press2015',
      phone: '+989012883045',
      vip: false,
      active: false,
    };

    it('should delete host by id', async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(host);
      PrismaMockService.host.update.mockResolvedValue(host);

      await service.remove(1);
      expect(prisma.host.update).toBeCalledWith({
        where: { id: 1 },
        data: {
          active: false,
        },
      });
      expect(prisma.host.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.host.findUnique.mockResolvedValue(null);
      PrismaMockService.host.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('host not found');
    });
  });
});

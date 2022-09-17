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
});

import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateResidenceDto, FilterResidenceDto, Residence } from './dto';
import { ResidenceService } from './residence.service';

const select = {
  id: true,
  host_id: true,
  title: true,
  type: {
    select: {
      id: true,
      title: true,
      fa_title: true,
    },
  },
  location: true,
  price: true,
  active: true,
  city: {
    select: {
      id: true,
      name: true,
      fa_name: true,
      total_residence_count: true,
      province: {
        select: {
          id: true,
          name: true,
          fa_name: true,
        },
      },
    },
  },
  images: {
    select: {
      residence_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
};

describe('CityService', () => {
  let service: ResidenceService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceService,
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

    service = module.get<ResidenceService>(ResidenceService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateCityDto): Promise<City>', () => {
    const residence: Residence = {
      id: 1,
      host_id: 123,
      title: 'vila',
      type: {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
      location: 'inja',
      price: 11111,
      active: false,
      city: {
        id: 1,
        name: 'shiraz',
        fa_name: 'شیراز',
        total_residence_count: 4,
        province: {
          id: 1,
          name: 'shiraz',
          fa_name: 'شیراز',
        },
      },
      images: [
        {
          residence_id: 111,
          url: '/path/to/file',
          width: 1000,
          height: 2000,
        },
      ],
    };

    it('should create new Residence and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence.create.mockResolvedValue(residence);

      const dto: CreateResidenceDto = {
        title: 'vila',
        city_id: 1,
        host_id: 123,
        location: 'inja',
        type_id: 1,
        price: 11111,
        active: false,
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(residence);
      expect(prisma.residence.create).toBeCalledWith({ select, data: dto });
      expect(prisma.residence.create).toBeCalledTimes(1);
    });
  });
});

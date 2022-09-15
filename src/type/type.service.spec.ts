import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateTypeDto, FilterTypeDto, Type } from './dto';
import { TypeService } from './type.service';

const select = {
  id: true,
  title: true,
  fa_title: true,
};

describe('TypeService', () => {
  let service: TypeService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
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

    service = module.get<TypeService>(TypeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateTypeDto): Promise<Type>', () => {
    const type: Type = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };

    it('should create new Type and return it', async () => {
      // mock prisma return value
      PrismaMockService.type.create.mockResolvedValue(type);

      const dto: CreateTypeDto = {
        title: 'apartment',
        fa_title: 'آپارتمان',
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(type);
      expect(prisma.type.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.type.create).toBeCalledTimes(1);
    });

    it('should throw error if the Type title already taken', async () => {
      // mock prisma return value
      PrismaMockService.type.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'type_title_UN' },
      });

      const dto: CreateTypeDto = {
        title: 'fars',
        fa_title: 'فارس',
      };

      await expect(service.create(dto)).rejects.toThrow(
        'title is taken before',
      );
    });
  });

  describe('async findAll(dto: FilterTypeDto): Promise<Type[]>', () => {
    const categories = [
      {
        id: 1,
        title: 'apartment',
        fa_title: 'آپارتمان',
      },
      {
        id: 2,
        title: 'villa',
        fa_title: 'ویلا',
      },
    ];

    it('should return all categories', async () => {
      // mock prisma return value
      PrismaMockService.type.findMany.mockResolvedValue(categories);

      const dto: FilterTypeDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(categories);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });

    it("should return all categories where title === 'vi'", async () => {
      // mock prisma return value
      PrismaMockService.type.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterTypeDto = {
        title: 'vi',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: { title: { contains: 'vi' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });

    it("should return all categories where fa_title === 'وی'", async () => {
      // mock prisma return value
      PrismaMockService.type.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterTypeDto = {
        fa_title: 'وی',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: { fa_title: { contains: 'وی' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });

    it('should return categories based on limit', async () => {
      // mock prisma return value
      const mockData: Type[] = [categories[0]];
      PrismaMockService.type.findMany.mockResolvedValue(mockData);

      const dto: FilterTypeDto = {
        fa_title: 'فا',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: { fa_title: { contains: 'فا' } },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });

    it('should return categories based on offset', async () => {
      // mock prisma return value
      PrismaMockService.type.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterTypeDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });

    it('should sort categories based on sort', async () => {
      // mock prisma return value
      PrismaMockService.type.findMany.mockResolvedValue([
        categories[1],
        categories[0],
      ]);

      const dto: FilterTypeDto = {
        sort: 'title:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1], categories[0]]);
      expect(prisma.type.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { title: 'asc' },
      });
      expect(prisma.type.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterTypeDto): Promise<number>', () => {
    it("should return type count based on title=='vi'", async () => {
      // mock prisma return value
      PrismaMockService.type.count.mockResolvedValue(1);

      const dto: FilterTypeDto = {
        title: 'vi',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.type.count).toBeCalledWith({
        where: { title: { contains: 'vi' } },
      });
      expect(prisma.type.count).toBeCalledTimes(1);
    });

    it("should return type count based on fa_title=='وی'", async () => {
      // mock prisma return value
      PrismaMockService.type.count.mockResolvedValue(1);

      const dto: FilterTypeDto = {
        fa_title: 'وی',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.type.count).toBeCalledWith({
        where: { fa_title: { contains: 'وی' } },
      });
      expect(prisma.type.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Type>', () => {
    const type = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };

    it('should return type by id', async () => {
      // mock prisma return value
      PrismaMockService.type.findUnique.mockResolvedValue(type);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(type);
      expect(prisma.type.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.type.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.type.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('type not found');
    });
  });

  describe('async update(id: string, updateTypeDto: UpdateTypeDto): Promise<Type>', () => {
    const type = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };

    it('should update type by id', async () => {
      // mock prisma return value
      PrismaMockService.type.update.mockResolvedValue(type);

      const result = await service.update(1, {
        title: 'apartmentt',
      });
      expect(result).toStrictEqual(type);
      expect(prisma.type.update).toBeCalledWith({
        select,
        data: {
          title: 'apartmentt',
          fa_title: undefined,
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.type.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.type.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { title: 'title' })).rejects.toThrow(
        'type not found',
      );
    });

    it('should throw error if the type title already taken', async () => {
      // mock prisma return value
      PrismaMockService.type.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'type_title_UN' },
      });

      await expect(service.update(2, { title: 'kashan' })).rejects.toThrow(
        'title is taken before',
      );
    });

    it('should throw error if the type fa_title already taken', async () => {
      // mock prisma return value
      PrismaMockService.type.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'type_fa_title_UN' },
      });

      await expect(service.update(2, { fa_title: 'کاشان' })).rejects.toThrow(
        'fa_title is taken before',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const type = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };

    it('should delete type by id', async () => {
      // mock prisma return value
      PrismaMockService.type.delete.mockResolvedValue(type);

      await service.remove(1);
      expect(prisma.type.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.type.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.type.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('type not found');
    });
  });
});

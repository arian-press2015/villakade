import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateCategoryDto, FilterCategoryDto, Category } from './dto';
import { CategoryService } from './category.service';

const select = {
  id: true,
  title: true,
  fa_title: true,
};

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
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

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateCategoryDto): Promise<Category>', () => {
    const category: Category = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };

    it('should create new Category and return it', async () => {
      // mock prisma return value
      PrismaMockService.category.create.mockResolvedValue(category);

      const dto: CreateCategoryDto = {
        title: 'apartment',
        fa_title: 'آپارتمان',
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(category);
      expect(prisma.category.create).toBeCalledWith({
        select,
        data: dto,
      });
      expect(prisma.category.create).toBeCalledTimes(1);
    });

    it('should throw error if the Category title already taken', async () => {
      // mock prisma return value
      PrismaMockService.category.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'category_title_UN' },
      });

      const dto: CreateCategoryDto = {
        title: 'fars',
        fa_title: 'فارس',
      };

      await expect(service.create(dto)).rejects.toThrow(
        'title is taken before',
      );
    });
  });

  describe('async findAll(dto: FilterCategoryDto): Promise<Category[]>', () => {
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
      PrismaMockService.category.findMany.mockResolvedValue(categories);

      const dto: FilterCategoryDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(categories);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });

    it("should return all categories where title === 'vi'", async () => {
      // mock prisma return value
      PrismaMockService.category.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterCategoryDto = {
        title: 'vi',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: { title: { contains: 'vi' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });

    it("should return all categories where fa_title === 'وی'", async () => {
      // mock prisma return value
      PrismaMockService.category.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterCategoryDto = {
        fa_title: 'وی',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: { fa_title: { contains: 'وی' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });

    it('should return categories based on limit', async () => {
      // mock prisma return value
      const mockData: Category[] = [categories[0]];
      PrismaMockService.category.findMany.mockResolvedValue(mockData);

      const dto: FilterCategoryDto = {
        fa_title: 'فا',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: { fa_title: { contains: 'فا' } },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });

    it('should return categories based on offset', async () => {
      // mock prisma return value
      PrismaMockService.category.findMany.mockResolvedValue([categories[1]]);

      const dto: FilterCategoryDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1]]);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });

    it('should sort categories based on sort', async () => {
      // mock prisma return value
      PrismaMockService.category.findMany.mockResolvedValue([
        categories[1],
        categories[0],
      ]);

      const dto: FilterCategoryDto = {
        sort: 'title:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categories[1], categories[0]]);
      expect(prisma.category.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { title: 'asc' },
      });
      expect(prisma.category.findMany).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Category>', () => {
    const category = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
    };
    it('should return category by id', async () => {
      // mock prisma return value
      PrismaMockService.category.findUnique.mockResolvedValue(category);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(category);
      expect(prisma.category.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.category.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow('category not found');
    });
  });
});

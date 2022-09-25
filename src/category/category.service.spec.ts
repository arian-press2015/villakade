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
  category_image: {
    select: {
      category_id: true,
      url: true,
      width: true,
      height: true,
    },
  },
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
      category_image: {
        category_id: 123,
        url: '/here',
        width: 400,
        height: 500,
      },
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
        category_image: {
          category_id: 123,
          url: '/here',
          width: 400,
          height: 500,
        },
      },
      {
        id: 2,
        title: 'villa',
        fa_title: 'ویلا',
        category_image: {
          category_id: 123,
          url: '/here',
          width: 400,
          height: 500,
        },
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

  describe('async getCount(dto: FilterCategoryDto): Promise<number>', () => {
    it("should return category count based on title=='vi'", async () => {
      // mock prisma return value
      PrismaMockService.category.count.mockResolvedValue(1);

      const dto: FilterCategoryDto = {
        title: 'vi',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.category.count).toBeCalledWith({
        where: { title: { contains: 'vi' } },
      });
      expect(prisma.category.count).toBeCalledTimes(1);
    });

    it("should return category count based on fa_title=='وی'", async () => {
      // mock prisma return value
      PrismaMockService.category.count.mockResolvedValue(1);

      const dto: FilterCategoryDto = {
        fa_title: 'وی',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.category.count).toBeCalledWith({
        where: { fa_title: { contains: 'وی' } },
      });
      expect(prisma.category.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<Category>', () => {
    const category = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
      category_image: {
        category_id: 123,
        url: '/here',
        width: 400,
        height: 500,
      },
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

  describe('async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>', () => {
    const category = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
      category_image: {
        category_id: 123,
        url: '/here',
        width: 400,
        height: 500,
      },
    };

    it('should update category by id', async () => {
      // mock prisma return value
      PrismaMockService.category.update.mockResolvedValue(category);

      const result = await service.update(1, {
        title: 'apartmentt',
      });
      expect(result).toStrictEqual(category);
      expect(prisma.category.update).toBeCalledWith({
        select,
        data: {
          title: 'apartmentt',
          fa_title: undefined,
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.category.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { title: 'title' })).rejects.toThrow(
        'category not found',
      );
    });

    it('should throw error if the category title already taken', async () => {
      // mock prisma return value
      PrismaMockService.category.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'category_title_UN' },
      });

      await expect(service.update(2, { title: 'kashan' })).rejects.toThrow(
        'title is taken before',
      );
    });

    it('should throw error if the category fa_title already taken', async () => {
      // mock prisma return value
      PrismaMockService.category.update.mockRejectedValue({
        code: 'P2002',
        meta: { target: 'category_fa_title_UN' },
      });

      await expect(service.update(2, { fa_title: 'کاشان' })).rejects.toThrow(
        'fa_title is taken before',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const category = {
      id: 1,
      title: 'apartment',
      fa_title: 'آپارتمان',
      category_image: {
        category_id: 123,
        url: '/here',
        width: 400,
        height: 500,
      },
    };

    it('should delete category by id', async () => {
      // mock prisma return value
      PrismaMockService.category.delete.mockResolvedValue(category);

      await service.remove(1);
      expect(prisma.category.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.category.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow('category not found');
    });
  });
});

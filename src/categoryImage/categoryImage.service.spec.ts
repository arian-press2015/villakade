import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateCategoryImageDto,
  FilterCategoryImageDto,
  CategoryImage,
} from './dto';
import { CategoryImageService } from './categoryImage.service';

const select = {
  category_id: true,
  url: true,
  width: true,
  height: true,
};

describe('CategoryImageService', () => {
  let service: CategoryImageService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryImageService,
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

    service = module.get<CategoryImageService>(CategoryImageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateCategoryImageDto): Promise<CategoryImage>', () => {
    const categoryImage: CategoryImage = {
      category_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should create new CategoryImage and return it', async () => {
      // mock prisma return value
      PrismaMockService.category_image.create.mockResolvedValue(categoryImage);

      const dto = {
        category_id: 1,
        width: 400,
        height: 200,
        file: {
          fieldname: 'file',
          originalname: 'Screenshot from 2022-09-09 00-13-56.png',
          encoding: '7bit',
          mimetype: 'image/png',
          destination:
            '/home/ap2015/ap2015/villakade/public/categoryImage/1401-06-25',
          filename: 'ca400851-facf-4978-88f9-b9b2c830b190.png',
          path: '/home/ap2015/ap2015/villakade/public/categoryImage/1401-06-25/ca400851-facf-4978-88f9-b9b2c830b190.png',
          size: 569282,
        },
      };

      const result = await service.create(dto, '/path/to/file');
      expect(result).toStrictEqual(categoryImage);
      expect(prisma.category_image.create).toBeCalledWith({
        select,
        data: categoryImage,
      });
      expect(prisma.category_image.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterCategoryImageDto): Promise<CategoryImage[]>', () => {
    const categoryImages = [
      {
        category_id: 1,
        url: '/path/to/file',
        width: 400,
        height: 200,
      },
      {
        category_id: 2,
        url: '/path/to/file2',
        width: 400,
        height: 200,
      },
    ];

    it('should return all categoryImages', async () => {
      // mock prisma return value
      PrismaMockService.category_image.findMany.mockResolvedValue(
        categoryImages,
      );

      const dto: FilterCategoryImageDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(categoryImages);
      expect(prisma.category_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category_image.findMany).toBeCalledTimes(1);
    });

    it('should return all categoryImages where category_id === 1', async () => {
      // mock prisma return value
      PrismaMockService.category_image.findMany.mockResolvedValue([
        categoryImages[0],
      ]);

      const dto: FilterCategoryImageDto = {
        category_id: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categoryImages[0]]);
      expect(prisma.category_image.findMany).toBeCalledWith({
        select,
        where: { category_id: 1 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category_image.findMany).toBeCalledTimes(1);
    });

    it('should return categoryImages based on limit', async () => {
      // mock prisma return value
      const mockData: CategoryImage[] = [categoryImages[0]];
      PrismaMockService.category_image.findMany.mockResolvedValue(mockData);

      const dto: FilterCategoryImageDto = {
        category_id: '2',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.category_image.findMany).toBeCalledWith({
        select,
        where: { category_id: 2 },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.category_image.findMany).toBeCalledTimes(1);
    });

    it('should return categoryImages based on offset', async () => {
      // mock prisma return value
      PrismaMockService.category_image.findMany.mockResolvedValue([
        categoryImages[1],
      ]);

      const dto: FilterCategoryImageDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categoryImages[1]]);
      expect(prisma.category_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.category_image.findMany).toBeCalledTimes(1);
    });

    it('should sort categoryImages based on sort', async () => {
      // mock prisma return value
      PrismaMockService.category_image.findMany.mockResolvedValue([
        categoryImages[1],
        categoryImages[0],
      ]);

      const dto: FilterCategoryImageDto = {
        sort: 'title:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([categoryImages[1], categoryImages[0]]);
      expect(prisma.category_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { title: 'asc' },
      });
      expect(prisma.category_image.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterCategoryImageDto): Promise<number>', () => {
    it("should return categoryImage count based on category_id=='1'", async () => {
      // mock prisma return value
      PrismaMockService.category_image.count.mockResolvedValue(1);

      const dto: FilterCategoryImageDto = {
        category_id: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.category_image.count).toBeCalledWith({
        where: { category_id: 1 },
      });
      expect(prisma.category_image.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<CategoryImage>', () => {
    const categoryImage = {
      category_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should return categoryImage by category_id', async () => {
      // mock prisma return value
      PrismaMockService.category_image.findUnique.mockResolvedValue(
        categoryImage,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(categoryImage);
      expect(prisma.category_image.findUnique).toBeCalledWith({
        select,
        where: { category_id: 1 },
      });
      expect(prisma.category_image.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category_image.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'categoryimage not found',
      );
    });
  });

  describe('async update(id: string, updateCategoryImageDto: UpdateCategoryImageDto): Promise<CategoryImage>', () => {
    const categoryImage = {
      category_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should update categoryImage by id', async () => {
      // mock prisma return value
      PrismaMockService.category_image.update.mockResolvedValue(categoryImage);

      const result = await service.update(1, {
        category_id: 2,
      });
      expect(result).toStrictEqual(categoryImage);
      expect(prisma.category_image.update).toBeCalledWith({
        select,
        data: {
          category_id: 2,
        },
        where: {
          category_id: 1,
        },
      });
      expect(prisma.category_image.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category_image.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { category_id: 2 })).rejects.toThrow(
        'categoryimage not found',
      );
    });
  });

  describe('async delete(category_id: string): Promise<void>', () => {
    const categoryImage = {
      category_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should delete categoryImage by category_id', async () => {
      // mock prisma return value
      PrismaMockService.category_image.delete.mockResolvedValue(categoryImage);

      await service.remove(1);
      expect(prisma.category_image.delete).toBeCalledWith({
        where: { category_id: 1 },
      });
      expect(prisma.category_image.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.category_image.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'categoryimage not found',
      );
    });
  });
});

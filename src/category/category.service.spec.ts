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
});

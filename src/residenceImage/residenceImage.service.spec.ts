import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import {
  CreateResidenceImageDto,
  FilterResidenceImageDto,
  ResidenceImage,
} from './dto';
import { ResidenceImageService } from './residenceImage.service';

const select = {
  residence_id: true,
  url: true,
  width: true,
  height: true,
};

describe('ResidenceImageService', () => {
  let service: ResidenceImageService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResidenceImageService,
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

    service = module.get<ResidenceImageService>(ResidenceImageService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateResidenceImageDto): Promise<ResidenceImage>', () => {
    const residenceImage: ResidenceImage = {
      residence_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should create new ResidenceImage and return it', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.create.mockResolvedValue(
        residenceImage,
      );

      const dto = {
        residence_id: 1,
        width: 400,
        height: 200,
        file: {
          fieldname: 'file',
          originalname: 'Screenshot from 2022-09-09 00-13-56.png',
          encoding: '7bit',
          mimetype: 'image/png',
          destination:
            '/home/ap2015/ap2015/villakade/public/residenceImage/1401-06-25',
          filename: 'ca400851-facf-4978-88f9-b9b2c830b190.png',
          path: '/home/ap2015/ap2015/villakade/public/residenceImage/1401-06-25/ca400851-facf-4978-88f9-b9b2c830b190.png',
          size: 569282,
        },
      };

      const result = await service.create(dto, '/path/to/file');
      expect(result).toStrictEqual(residenceImage);
      expect(prisma.residence_image.create).toBeCalledWith({
        select,
        data: residenceImage,
      });
      expect(prisma.residence_image.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterResidenceImageDto): Promise<ResidenceImage[]>', () => {
    const residenceImages = [
      {
        residence_id: 1,
        url: '/path/to/file',
        width: 400,
        height: 200,
      },
      {
        residence_id: 2,
        url: '/path/to/file2',
        width: 400,
        height: 200,
      },
    ];

    it('should return all residenceImages', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findMany.mockResolvedValue(
        residenceImages,
      );

      const dto: FilterResidenceImageDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(residenceImages);
      expect(prisma.residence_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_image.findMany).toBeCalledTimes(1);
    });

    it('should return all residenceImages where residence_id === 1', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findMany.mockResolvedValue([
        residenceImages[0],
      ]);

      const dto: FilterResidenceImageDto = {
        residence_id: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residenceImages[0]]);
      expect(prisma.residence_image.findMany).toBeCalledWith({
        select,
        where: { residence_id: 1 },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_image.findMany).toBeCalledTimes(1);
    });

    it('should return residenceImages based on limit', async () => {
      // mock prisma return value
      const mockData: ResidenceImage[] = [residenceImages[0]];
      PrismaMockService.residence_image.findMany.mockResolvedValue(mockData);

      const dto: FilterResidenceImageDto = {
        residence_id: '2',
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.residence_image.findMany).toBeCalledWith({
        select,
        where: { residence_id: 2 },
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.residence_image.findMany).toBeCalledTimes(1);
    });

    it('should return residenceImages based on offset', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findMany.mockResolvedValue([
        residenceImages[1],
      ]);

      const dto: FilterResidenceImageDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residenceImages[1]]);
      expect(prisma.residence_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.residence_image.findMany).toBeCalledTimes(1);
    });

    it('should sort residenceImages based on sort', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findMany.mockResolvedValue([
        residenceImages[1],
        residenceImages[0],
      ]);

      const dto: FilterResidenceImageDto = {
        sort: 'title:asc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([residenceImages[1], residenceImages[0]]);
      expect(prisma.residence_image.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { title: 'asc' },
      });
      expect(prisma.residence_image.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterResidenceImageDto): Promise<number>', () => {
    it("should return residenceImage count based on residence_id=='1'", async () => {
      // mock prisma return value
      PrismaMockService.residence_image.count.mockResolvedValue(1);

      const dto: FilterResidenceImageDto = {
        residence_id: '1',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.residence_image.count).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_image.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ResidenceImage>', () => {
    const residenceImage = {
      residence_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should return residenceImage by residence_id', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findUnique.mockResolvedValue(
        residenceImage,
      );

      const result = await service.findOne(1);
      expect(result).toStrictEqual(residenceImage);
      expect(prisma.residence_image.findUnique).toBeCalledWith({
        select,
        where: { residence_id: 1 },
      });
      expect(prisma.residence_image.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_image.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'residenceimage not found',
      );
    });
  });

  describe('async update(id: string, updateResidenceImageDto: UpdateResidenceImageDto): Promise<ResidenceImage>', () => {
    const residenceImage = {
      residence_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should update residenceImage by id', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.update.mockResolvedValue(
        residenceImage,
      );

      const result = await service.update(1, {
        residence_id: 2,
      });
      expect(result).toStrictEqual(residenceImage);
      expect(prisma.residence_image.update).toBeCalledWith({
        select,
        data: {
          residence_id: 2,
        },
        where: {
          residence_id: 1,
        },
      });
      expect(prisma.residence_image.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_image.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { residence_id: 2 })).rejects.toThrow(
        'residenceimage not found',
      );
    });
  });

  describe('async delete(residence_id: string): Promise<void>', () => {
    const residenceImage = {
      residence_id: 1,
      url: '/path/to/file',
      width: 400,
      height: 200,
    };

    it('should delete residenceImage by residence_id', async () => {
      // mock prisma return value
      PrismaMockService.residence_image.delete.mockResolvedValue(
        residenceImage,
      );

      await service.remove(1);
      expect(prisma.residence_image.delete).toBeCalledWith({
        where: { residence_id: 1 },
      });
      expect(prisma.residence_image.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.residence_image.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'residenceimage not found',
      );
    });
  });
});

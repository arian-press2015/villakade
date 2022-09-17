import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../config/configuration';
import { PrismaService } from '../shared/services/prisma.service';
import PrismaMockService from '../shared/services/prismaMock.service';
import { CreateContactUsDto, FilterContactUsDto, ContactUs } from './dto';
import { ContactUsService } from './contactUs.service';

const select = {
  id: true,
  full_name: true,
  phone: true,
  description: true,
  email: true,
};

describe('ContactUsService', () => {
  let service: ContactUsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactUsService,
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

    service = module.get<ContactUsService>(ContactUsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('async create(dto: CreateContactUsDto): Promise<ContactUs>', () => {
    const contact_us: ContactUs = {
      id: 1,
      email: 'arian.press2015@gmail.com',
      phone: '+989012883045',
      full_name: 'AP2015',
      description: 'Here I am',
    };

    it('should create new ContactUs and return it', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.create.mockResolvedValue(contact_us);

      const dto: CreateContactUsDto = {
        phone: '+989012883045',
        full_name: 'AP2015',
        description: 'Here I am',
        email: 'arian.press2015@gmail.com',
      };

      const result = await service.create(dto);
      expect(result).toStrictEqual(contact_us);
      expect(prisma.contact_us.create).toBeCalledWith({ select, data: dto });
      expect(prisma.contact_us.create).toBeCalledTimes(1);
    });
  });

  describe('async findAll(dto: FilterContactUsDto): Promise<ContactUs[]>', () => {
    const contact_uss = [
      {
        id: 1,
        full_name: 'AP2015',
        phone: '+989012883045',
        description: 'Here I am',
        email: 'arian.press2015@gmail.com',
      },
      {
        id: 2,
        full_name: 'ES2015',
        phone: '+989132233694',
        description: 'There I am',
        email: 'm.gorganm@gmail.com',
      },
    ];

    it('should return all contact_uss', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue(contact_uss);

      const dto: FilterContactUsDto = {};
      const result = await service.findAll(dto);
      expect(result).toStrictEqual(contact_uss);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it("should return all contact_uss where full_name === 'AP'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([contact_uss[0]]);

      const dto: FilterContactUsDto = {
        full_name: 'AP',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[0]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: { full_name: { contains: 'AP' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it("should return all contact_uss where phone === '45'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([contact_uss[0]]);

      const dto: FilterContactUsDto = {
        phone: '45',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[0]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: { phone: { contains: '45' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it("should return all contact_uss where description === 'Here'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([contact_uss[0]]);

      const dto: FilterContactUsDto = {
        description: 'Here',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[0]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: { description: { contains: 'Here' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it("should return all contact_uss where email === 'arian'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([contact_uss[0]]);

      const dto: FilterContactUsDto = {
        email: 'arian',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[0]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: { email: { contains: 'arian' } },
        skip: undefined,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it('should return contact_uss based on limit', async () => {
      // mock prisma return value
      const mockData: ContactUs[] = [contact_uss[0]];
      PrismaMockService.contact_us.findMany.mockResolvedValue(mockData);

      const dto: FilterContactUsDto = {
        limit: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual(mockData);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: 1,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it('should return contact_uss based on offset', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([contact_uss[1]]);

      const dto: FilterContactUsDto = {
        offset: '1',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[1]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: {},
        skip: 1,
        take: undefined,
        orderBy: {},
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });

    it('should sort contact_uss based on sort', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findMany.mockResolvedValue([
        contact_uss[1],
        contact_uss[0],
      ]);

      const dto: FilterContactUsDto = {
        sort: 'full_name:desc',
      };

      const result = await service.findAll(dto);
      expect(result).toStrictEqual([contact_uss[1], contact_uss[0]]);
      expect(prisma.contact_us.findMany).toBeCalledWith({
        select,
        where: {},
        skip: undefined,
        take: undefined,
        orderBy: { full_name: 'desc' },
      });
      expect(prisma.contact_us.findMany).toBeCalledTimes(1);
    });
  });

  describe('async getCount(dto: FilterContactUsDto): Promise<number>', () => {
    it("should return contact_us count based on full_name=='AP'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.count.mockResolvedValue(1);

      const dto: FilterContactUsDto = {
        full_name: 'AP',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.contact_us.count).toBeCalledWith({
        where: { full_name: { contains: 'AP' } },
      });
      expect(prisma.contact_us.count).toBeCalledTimes(1);
    });

    it("should return contact_us count based on phone=='45'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.count.mockResolvedValue(1);

      const dto: FilterContactUsDto = {
        phone: '45',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.contact_us.count).toBeCalledWith({
        where: { phone: { contains: '45' } },
      });
      expect(prisma.contact_us.count).toBeCalledTimes(1);
    });

    it("should return contact_us count based on description === 'There'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.count.mockResolvedValue(1);

      const dto: FilterContactUsDto = {
        description: 'There',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.contact_us.count).toBeCalledWith({
        where: { description: { contains: 'There' } },
      });
      expect(prisma.contact_us.count).toBeCalledTimes(1);
    });

    it("should return contact_us count based on email === 'arian'", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.count.mockResolvedValue(1);

      const dto: FilterContactUsDto = {
        email: 'arian',
      };

      const result = await service.getCount(dto);
      expect(result).toEqual(1);
      expect(prisma.contact_us.count).toBeCalledWith({
        where: { email: { contains: 'arian' } },
      });
      expect(prisma.contact_us.count).toBeCalledTimes(1);
    });
  });

  describe('async findOne(id: string): Promise<ContactUs>', () => {
    const contact_us = {
      id: 1,
      full_name: 'AP2015',
      phone: '+989012883045',
      description: 'Here I am',
      email: 'arian.press2015@gmail.com',
    };
    it('should return contact_us by id', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findUnique.mockResolvedValue(contact_us);

      const result = await service.findOne(1);
      expect(result).toStrictEqual(contact_us);
      expect(prisma.contact_us.findUnique).toBeCalledWith({
        select,
        where: { id: 1 },
      });
      expect(prisma.contact_us.findUnique).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1000)).rejects.toThrow(
        'contact_us not found',
      );
    });
  });

  describe('async update(id: string, updateContactUsDto: UpdateContactUsDto): Promise<ContactUs>', () => {
    const contact_us = {
      id: 1,
      full_name: 'AP2015',
      phone: '+989012883045',
      description: 'Here I am',
      email: 'arian.press2015@gmail.com',
    };
    it('should update contact_us by id', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.update.mockResolvedValue(contact_us);

      const result = await service.update(1, {
        full_name: 'name',
        phone: '+989132233694',
        description: 'Here I am',
        email: 'arian.press2015@gmail.com',
      });
      expect(result).toStrictEqual(contact_us);
      expect(prisma.contact_us.update).toBeCalledWith({
        select,
        data: {
          full_name: 'name',
          phone: '+989132233694',
          description: 'Here I am',
          email: 'arian.press2015@gmail.com',
        },
        where: {
          id: 1,
        },
      });
      expect(prisma.contact_us.update).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.update.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to update not found.' },
      });

      await expect(service.update(1000, { full_name: 'name' })).rejects.toThrow(
        'contact_us not found',
      );
    });
  });

  describe('async delete(id: string): Promise<void>', () => {
    const contact_us = {
      id: 1,
      full_name: 'AP2015',
      phone: '+989012883045',
      description: 'Here I am',
      email: 'arian.press2015@gmail.com',
    };
    it('should delete contact_us by id', async () => {
      // mock prisma return value
      PrismaMockService.contact_us.delete.mockResolvedValue(contact_us);

      await service.remove(1);
      expect(prisma.contact_us.delete).toBeCalledWith({
        where: { id: 1 },
      });
      expect(prisma.contact_us.delete).toBeCalledTimes(1);
    });

    it("should throw if id doesn't exist", async () => {
      // mock prisma return value
      PrismaMockService.contact_us.delete.mockRejectedValue({
        code: 'P2025',
        meta: { cause: 'Record to delete does not exist.' },
      });

      await expect(service.remove(1000)).rejects.toThrow(
        'contact_us not found',
      );
    });
  });
});

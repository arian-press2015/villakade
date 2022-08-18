import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceCategoryService } from './residenceResidenceCategory.service';

describe('ResidenceCategoryService', () => {
  let service: ResidenceCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenceCategoryService],
    }).compile();

    service = module.get<ResidenceCategoryService>(ResidenceCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

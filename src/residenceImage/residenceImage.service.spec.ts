import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceImageService } from './residenceImage.service';

describe('ResidenceImageService', () => {
  let service: ResidenceImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenceImageService],
    }).compile();

    service = module.get<ResidenceImageService>(ResidenceImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

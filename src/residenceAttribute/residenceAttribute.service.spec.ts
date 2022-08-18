import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceAttributeService } from './residenceAttribute.service';

describe('ResidenceAttributeService', () => {
  let service: ResidenceAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenceAttributeService],
    }).compile();

    service = module.get<ResidenceAttributeService>(ResidenceAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

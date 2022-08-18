import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceRuleService } from './residenceRule.service';

describe('ResidenceRuleService', () => {
  let service: ResidenceRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenceRuleService],
    }).compile();

    service = module.get<ResidenceRuleService>(ResidenceRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

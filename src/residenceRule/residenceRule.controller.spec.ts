import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceRuleController } from './residenceRule.controller';
import { ResidenceRuleService } from './residenceRule.service';

describe('ResidenceRuleController', () => {
  let controller: ResidenceRuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceRuleController],
      providers: [ResidenceRuleService],
    }).compile();

    controller = module.get<ResidenceRuleController>(ResidenceRuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

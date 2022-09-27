import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceAirConditioningController } from './residenceAirConditioning.controller';
import { ResidenceAirConditioningService } from './residenceAirConditioning.service';

describe('ResidenceAirConditioningController', () => {
  let controller: ResidenceAirConditioningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceAirConditioningController],
      providers: [ResidenceAirConditioningService],
    }).compile();

    controller = module.get<ResidenceAirConditioningController>(ResidenceAirConditioningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

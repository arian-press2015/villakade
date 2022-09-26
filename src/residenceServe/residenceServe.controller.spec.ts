import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceServeController } from './residenceServe.controller';
import { ResidenceServeService } from './residenceServe.service';

describe('ResidenceServeController', () => {
  let controller: ResidenceServeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceServeController],
      providers: [ResidenceServeService],
    }).compile();

    controller = module.get<ResidenceServeController>(ResidenceServeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

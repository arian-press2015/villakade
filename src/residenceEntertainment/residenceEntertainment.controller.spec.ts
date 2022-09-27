import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceEntertainmentController } from './residenceEntertainment.controller';
import { ResidenceEntertainmentService } from './residenceEntertainment.service';

describe('ResidenceEntertainmentController', () => {
  let controller: ResidenceEntertainmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceEntertainmentController],
      providers: [ResidenceEntertainmentService],
    }).compile();

    controller = module.get<ResidenceEntertainmentController>(ResidenceEntertainmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

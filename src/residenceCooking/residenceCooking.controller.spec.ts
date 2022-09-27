import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceCookingController } from './residenceCooking.controller';
import { ResidenceCookingService } from './residenceCooking.service';

describe('ResidenceCookingController', () => {
  let controller: ResidenceCookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceCookingController],
      providers: [ResidenceCookingService],
    }).compile();

    controller = module.get<ResidenceCookingController>(ResidenceCookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

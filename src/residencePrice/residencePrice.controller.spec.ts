import { Test, TestingModule } from '@nestjs/testing';
import { ResidencePriceController } from './residencePrice.controller';
import { ResidencePriceService } from './residencePrice.service';

describe('ResidencePriceController', () => {
  let controller: ResidencePriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidencePriceController],
      providers: [ResidencePriceService],
    }).compile();

    controller = module.get<ResidencePriceController>(ResidencePriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

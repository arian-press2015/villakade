import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceImageController } from './residenceImage.controller';
import { ResidenceImageService } from './residenceImage.service';

describe('ResidenceImageController', () => {
  let controller: ResidenceImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceImageController],
      providers: [ResidenceImageService],
    }).compile();

    controller = module.get<ResidenceImageController>(ResidenceImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceWcBathroomController } from './residenceWcBathroom.controller';
import { ResidenceWcBathroomService } from './residenceWcBathroom.service';

describe('ResidenceWcBathroomController', () => {
  let controller: ResidenceWcBathroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceWcBathroomController],
      providers: [ResidenceWcBathroomService],
    }).compile();

    controller = module.get<ResidenceWcBathroomController>(
      ResidenceWcBathroomController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

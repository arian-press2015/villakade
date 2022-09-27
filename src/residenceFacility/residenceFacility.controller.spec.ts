import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceFacilityController } from './residenceFacility.controller';
import { ResidenceFacilityService } from './residenceFacility.service';

describe('ResidenceFacilityController', () => {
  let controller: ResidenceFacilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceFacilityController],
      providers: [ResidenceFacilityService],
    }).compile();

    controller = module.get<ResidenceFacilityController>(
      ResidenceFacilityController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

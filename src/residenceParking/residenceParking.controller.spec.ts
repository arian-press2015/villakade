import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceParkingController } from './residenceParking.controller';
import { ResidenceParkingService } from './residenceParking.service';

describe('ResidenceParkingController', () => {
  let controller: ResidenceParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceParkingController],
      providers: [ResidenceParkingService],
    }).compile();

    controller = module.get<ResidenceParkingController>(
      ResidenceParkingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

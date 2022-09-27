import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceRoomController } from './residenceRoom.controller';
import { ResidenceRoomService } from './residenceRoom.service';

describe('ResidenceRoomController', () => {
  let controller: ResidenceRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceRoomController],
      providers: [ResidenceRoomService],
    }).compile();

    controller = module.get<ResidenceRoomController>(ResidenceRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

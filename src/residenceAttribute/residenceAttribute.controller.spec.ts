import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceAttributeController } from './residenceAttribute.controller';
import { ResidenceAttributeService } from './residenceAttribute.service';

describe('ResidenceAttributeController', () => {
  let controller: ResidenceAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceAttributeController],
      providers: [ResidenceAttributeService],
    }).compile();

    controller = module.get<ResidenceAttributeController>(ResidenceAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

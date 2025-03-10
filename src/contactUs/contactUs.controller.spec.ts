import { Test, TestingModule } from '@nestjs/testing';
import { ContactUsController } from './contactUs.controller';
import { ContactUsService } from './contactUs.service';

describe('ContactUsController', () => {
  let controller: ContactUsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactUsController],
      providers: [ContactUsService],
    }).compile();

    controller = module.get<ContactUsController>(ContactUsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

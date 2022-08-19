import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceCategoryController } from './residenceResidenceCategory.controller';
import { ResidenceCategoryService } from './residenceResidenceCategory.service';

describe('ResidenceCategoryController', () => {
  let controller: ResidenceCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceCategoryController],
      providers: [ResidenceCategoryService],
    }).compile();

    controller = module.get<ResidenceCategoryController>(
      ResidenceCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
